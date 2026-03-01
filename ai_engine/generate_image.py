import os
import re
import sys
import json
import torch
import time
from diffusers import FluxPipeline

# Fix for Windows console UnicodeEncodeError
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")

# --- EXPERT DIAGNOSTICS ---
print(f"--- 🛠️ AI Engine Startup Diagnostics ---")
print(f"Python Executable: {sys.executable}")
print(f"Torch: {torch.__version__} (CUDA: {torch.cuda.is_available()})")
try:
    import torchvision
    print(f"Torchvision: {torchvision.__version__}")
except ImportError:
    print("Torchvision: NOT INSTALLED")
try:
    import transformers
    print(f"Transformers: {transformers.__version__}")
except ImportError:
    print("Transformers: NOT INSTALLED")
try:
    import diffusers
    print(f"Diffusers: {diffusers.__version__}")
except ImportError:
    print("Diffusers: NOT INSTALLED")
print(f"----------------------------------------")


def sanitize_prompt(p: str) -> str:
    p = (p or "").strip()
    # Remove metadata/instructions that confuse the model
    p = re.sub(r"^Here is the refined image prompt:\s*", "", p, flags=re.I)
    p = re.sub(r"\*\*Hero Image for.*?\*\*", "", p, flags=re.I | re.S)
    p = re.sub(r"\*\*Description:\*\*", "", p, flags=re.I)
    p = re.sub(r"\*\*Visual Requirements:\*\*", "", p, flags=re.I)
    p = p.replace("*", "") # Remove bullets
    
    # If it ends with a quoted block, keep inner content
    m = re.search(r'"([^"]{20,})"\s*$', p, flags=re.S)
    if m:
        p = m.group(1).strip()

    # Strip outer quotes
    if len(p) >= 2:
        if (p.startswith('"') and p.endswith('"')) or (p.startswith("'") and p.endswith("'")):
            p = p[1:-1].strip()

    # Normalize whitespace
    p = re.sub(r"\s+", " ", p).strip()
    
    # CLIP Truncation Fix: Limit to ~300 chars to avoid massive truncation warnings
    # while keeping enough detail for T5
    if len(p) > 350:
        p = p[:350] + "..."
        
    return p


def apply_lora(pipe: FluxPipeline, lora_path: str | None):
    if not lora_path or not os.path.exists(lora_path):
        return False

    file_size = os.path.getsize(lora_path)
    if file_size <= 1024 * 1024:
        print(f"⚠️ LoRA file is too small or invalid ({file_size} bytes). Skipping: {lora_path}")
        return False

    print(f"🔥 Applying LoRA: {lora_path} ({file_size / (1024*1024):.1f} MB)")
    try:
        # Using a safer way to fuse LoRA to avoid OOM during fusion
        pipe.load_lora_weights(lora_path)
        pipe.fuse_lora(lora_scale=0.85)
        return True
    except Exception as e:
        print(f"⚠️ Failed to load LoRA weights: {e}")
        return False


def build_pipe(model_path: str):
    has_cuda = torch.cuda.is_available()
    device = "cuda" if has_cuda else "cpu"
    
    if has_cuda:
        dtype = torch.float16
        print(f"✅ GPU Detected: {torch.cuda.get_device_name(0)}")
        print("💾 Using float16 (Optimized for Windows)")
    else:
        dtype = torch.float32
        print("🐢 Using float32 (CPU mode)")

    print(f"Loading model from {model_path}...")

    # load_schnell handles the shards.
    pipe = FluxPipeline.from_pretrained(
        model_path,
        torch_dtype=dtype,
        revision="main",
        use_safetensors=True,
        low_cpu_mem_usage=True, 
    )

    if has_cuda:
        # MODEL OFFLOAD is 10x faster than Sequential. For 12GB+ cards, this is the better choice.
        try:
            pipe.enable_model_cpu_offload()
            print("⚡ Model CPU Offload enabled (Balanced Speed/Memory)")
        except Exception:
            pipe.enable_sequential_cpu_offload()
            print("🧠 Sequential CPU Offload enabled (Maximum VRAM savings)")

        # Performance tweaks
        pipe.enable_attention_slicing()
        
        # xFormers is now installed!
        try:
            pipe.enable_xformers_memory_efficient_attention()
            print("🚀 xFormers Memory Efficient Attention enabled")
        except Exception as e:
            print(f"💡 xFormers fallback: {e}")
        
        if hasattr(pipe, "vae") and pipe.vae is not None:
            pipe.vae.enable_tiling()
            pipe.vae.enable_slicing()
    else:
        pipe.to("cpu")

    return pipe, device


def generate_one(pipe: FluxPipeline, device: str, prompt: str, output_path: str, has_lora: bool, width: int = 1024, height: int = 1024):
    prompt = sanitize_prompt(prompt)
    print(f"Generating image ({width}x{height}) for prompt: {prompt}")

    steps = 6 if has_lora else 4
    seed = int(torch.randint(0, 1_000_000, (1,)).item())
    gen = torch.Generator(device="cpu").manual_seed(seed) # CPU generator is safer for offloading

    start_t = time.time()
    out = pipe(
        prompt,
        width=width,
        height=height,
        guidance_scale=0.0,
        num_inference_steps=steps,
        max_sequence_length=256,
        generator=gen
    )
    end_t = time.time()

    image = out.images[0]
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"✅ Image saved to {output_path} (seed={seed}, time={end_t - start_t:.1f}s)")


def run_single(prompt: str, output_path: str, lora_path: str | None, width: int = 1024, height: int = 1024):
    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    model_path = os.path.join(os.path.dirname(__file__), "models", "FLUX.1-schnell")
    pipe, device = build_pipe(model_path)

    has_lora = apply_lora(pipe, lora_path)
    generate_one(pipe, device, prompt, output_path, has_lora, width, height)


def run_batch(output_dir: str, lora_path: str | None):
    """
    Reads jobs from stdin JSON:
      {
        "jobs": [
          {"filename":"stb_x_hero.png","prompt":"...", "width": 1216, "height": 688},
          {"filename":"stb_x_detail.png","prompt":"..."}
        ]
      }
    """
    payload = sys.stdin.read()
    data = json.loads(payload)
    jobs = data.get("jobs", [])

    if not jobs:
        print("No jobs received. Exiting.")
        return

    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    model_path = os.path.join(os.path.dirname(__file__), "models", "FLUX.1-schnell")
    pipe, device = build_pipe(model_path)

    has_lora = apply_lora(pipe, lora_path)

    for job in jobs:
        filename = job.get("filename")
        prompt = job.get("prompt")
        w = job.get("width", 1024)
        h = job.get("height", 1024)

        if not filename or not prompt:
            print(f"⚠️ Skipping invalid job: {job}")
            continue

        out_path = os.path.join(output_dir, filename)
        generate_one(pipe, device, prompt, out_path, has_lora, width=w, height=h)


if __name__ == "__main__":
    # Batch mode:
    # python generate_image.py --batch <output_dir> [lora_path]
    if len(sys.argv) >= 3 and sys.argv[1] == "--batch":
        output_dir = sys.argv[2]
        lora_path = sys.argv[3] if len(sys.argv) > 3 else None
        run_batch(output_dir, lora_path)
        sys.exit(0)

    # Single mode:
    # python generate_image.py 'prompt' 'output_path' [lora_path]
    if len(sys.argv) < 3:
        print("Usage: python generate_image.py 'prompt' 'output_path' [lora_path]")
        print("   or: python generate_image.py --batch <output_dir> [lora_path]  (stdin JSON)")
        sys.exit(1)

    prompt = sys.argv[1]
    output_path = sys.argv[2]
    lora_path = sys.argv[3] if len(sys.argv) > 3 else None

    run_single(prompt, output_path, lora_path)