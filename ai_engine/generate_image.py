import torch
from diffusers import FluxPipeline
import sys
import os
from PIL import Image

def generate(prompt, output_path):
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
    
    pipe.to(device)
    
    # Optional: memory optimization for large models
    if has_cuda:
        print("Enabling VRAM offload (optimized for 12GB cards)")
        pipe.enable_model_cpu_offload() 
        pass

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
