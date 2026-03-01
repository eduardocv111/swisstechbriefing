import os
import re
import sys
import torch
import time
from diffusers import FluxPipeline

# Fix for Windows console UnicodeEncodeError
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")

def sanitize_prompt(p: str) -> str:
    p = (p or "").strip()
    p = re.sub(r"<[^>]*>", "", p) # Quitar HTML
    if len(p) > 350: p = p[:350] + "..."
    return p

def build_pipe(model_path: str):
    print(f"Loading Flux model from {model_path}...")
    dtype = torch.float16 if torch.cuda.is_available() else torch.float32
    pipe = FluxPipeline.from_pretrained(
        model_path,
        torch_dtype=dtype,
        use_safetensors=True,
        low_cpu_mem_usage=True
    )
    print("Pipeline loaded. Enabling CPU offload...")
    if torch.cuda.is_available():
        pipe.enable_model_cpu_offload()
    else:
        pipe.to("cpu")
    return pipe

def run_single(prompt: str, output_path: str, lora_path: str | None):
    model_path = os.path.join(os.path.dirname(__file__), "models", "FLUX.1-schnell")
    pipe = build_pipe(model_path)
    
    if lora_path and os.path.exists(lora_path):
        print(f"Applying LoRA: {lora_path}")
        pipe.load_lora_weights(lora_path)
        pipe.fuse_lora(lora_scale=0.85)

    prompt = sanitize_prompt(prompt)
    print(f"Generating: {prompt}")
    
    seed = int(torch.randint(0, 1000000, (1,)).item())
    image = pipe(
        prompt,
        width=1024,
        height=576,
        guidance_scale=0.0,
        num_inference_steps=4,
        max_sequence_length=256,
        generator=torch.Generator("cpu").manual_seed(seed)
    ).images[0]
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    print(f"SUCCESS: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
    prompt = sys.argv[1]
    out_path = sys.argv[2]
    lora = sys.argv[3] if len(sys.argv) > 3 else None
    run_single(prompt, out_path, lora)