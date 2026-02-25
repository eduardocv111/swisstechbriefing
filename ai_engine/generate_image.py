import torch
from diffusers import FluxPipeline
import sys
import os
from PIL import Image

def generate(prompt, output_path):
    # Clear CUDA cache to free up memory from potential zombie processes
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    
    model_path = os.path.join(os.path.dirname(__file__), "models", "FLUX.1-schnell")
    
    print(f"Loading model from {model_path}...")
    
    # Check for GPU
    has_cuda = torch.cuda.is_available()
    device = "cuda" if has_cuda else "cpu"
    dtype = torch.float16 if has_cuda else torch.bfloat16
    
    print(f"Using Device: {device.upper()} | Precision: {dtype}")
    
    # Load the pipeline with optimizations
    pipe = FluxPipeline.from_pretrained(
        model_path, 
        torch_dtype=dtype,
        revision="main",
        use_safetensors=True
    )
    
    # Check for GPU and apply specific memory strategies for 12GB cards
    if has_cuda:
        print("Enabling Advanced VRAM Management (RTX 12GB+ Mode)...")
        # Do NOT use pipe.to(device) here if using cpu_offload
        pipe.enable_sequential_cpu_offload() # More aggressive than model_offload, essential if Ollama is running
        pipe.enable_vae_tiling()
        pipe.enable_vae_slicing()
        # pipe.enable_attention_slicing() # Optional, can be slow but saves more VRAM
    else:
        pipe.to("cpu")

    print(f"Generating image for prompt: {prompt}")
    
    # Generate - Schnell is optimized for 4 steps and guidance_scale 0
    image = pipe(
        prompt,
        guidance_scale=0.0,
        num_inference_steps=4,
        max_sequence_length=256,
        generator=torch.Generator(device=device).manual_seed(int(torch.randint(0, 1000000, (1,)).item()))
    ).images[0]

    # Save
    image.save(output_path)
    print(f"Image saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_image.py 'prompt' 'output_path'")
        sys.exit(1)
        
    prompt = sys.argv[1]
    output_path = sys.argv[2]
    generate(prompt, output_path)
