import os
import re
import sys
import json
import torch
from diffusers import FluxPipeline

# Fix for Windows console UnicodeEncodeError
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")


def sanitize_prompt(p: str) -> str:
    p = (p or "").strip()
    p = re.sub(r"^Here is the refined image prompt:\s*", "", p, flags=re.I)

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
        pipe.load_lora_weights(lora_path)
        pipe.fuse_lora(lora_scale=0.9)
        return True
    except Exception as e:
        print(f"⚠️ Failed to load LoRA weights: {e}")
        return False


def build_pipe(model_path: str):
    has_cuda = torch.cuda.is_available()
    device = "cuda" if has_cuda else "cpu"
    
    # Use bfloat16 for FLUX if CUDA is Ampere+ (much faster and stable)
    if has_cuda and torch.cuda.is_bf16_supported():
        dtype = torch.bfloat16
        print("🚀 Using bfloat16 (Ampere+ detected)")
    elif has_cuda:
        dtype = torch.float16
        print("💾 Using float16")
    else:
        dtype = torch.float32
        print("🐢 Using float32 (CPU mode)")

    print(f"Loading model from {model_path}...")

    pipe = FluxPipeline.from_pretrained(
        model_path,
        torch_dtype=dtype,
        revision="main",
        use_safetensors=True
    )

    if has_cuda:
        # Optimized VRAM management: 
        # model_cpu_offload moves parts to CPU when not in use.
        # This is the "lightweight" mode the user requested.
        try:
            pipe.enable_model_cpu_offload()
            print("🧠 Model CPU Offload enabled (VRAM optimized)")
        except Exception:
            pipe.to("cuda")
            print("⚡ Loaded directly to VRAM")

        # Performance tweaks
        pipe.enable_attention_slicing()
        
        # xFormers: The "Triton" for Windows
        try:
            pipe.enable_xformers_memory_efficient_attention()
            print("🚀 xFormers Memory Efficient Attention enabled")
        except Exception:
            print("💡 xFormers not available, using default attention")
        
        if hasattr(pipe, "vae") and pipe.vae is not None:
            pipe.vae.enable_tiling()
            pipe.vae.enable_slicing()
    else:
        pipe.to("cpu")

    return pipe, device


def generate_one(pipe: FluxPipeline, device: str, prompt: str, output_path: str, has_lora: bool):
    prompt = sanitize_prompt(prompt)
    print(f"Generating image for prompt: {prompt}")

    steps = 6 if has_lora else 4
    seed = int(torch.randint(0, 1_000_000, (1,)).item())
    gen = torch.Generator(device=device).manual_seed(seed)

    out = pipe(
        prompt,
        guidance_scale=0.0,
        num_inference_steps=steps,
        max_sequence_length=256,
        generator=gen
    )

    image = out.images[0]
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"Image saved to {output_path} (seed={seed})")


def run_single(prompt: str, output_path: str, lora_path: str | None):
    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    model_path = os.path.join(os.path.dirname(__file__), "models", "FLUX.1-schnell")
    pipe, device = build_pipe(model_path)

    has_lora = apply_lora(pipe, lora_path)
    generate_one(pipe, device, prompt, output_path, has_lora)


def run_batch(output_dir: str, lora_path: str | None):
    """
    Reads jobs from stdin JSON:
      {
        "jobs": [
          {"filename":"stb_x_hero.png","prompt":"..."},
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
        if not filename or not prompt:
            print(f"⚠️ Skipping invalid job: {job}")
            continue

        out_path = os.path.join(output_dir, filename)
        generate_one(pipe, device, prompt, out_path, has_lora)


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