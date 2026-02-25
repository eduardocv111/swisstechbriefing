import torch
from diffusers import FluxPipeline
import sys
import os
from PIL import Image

def generate(prompt, output_path):
    model_path = os.path.join(os.path.dirname(__file__), "models", "FLUX.1-schnell")
    
    print(f"Loading model from {model_path}...")
    
    # Load the pipeline
    pipe = FluxPipeline.from_pretrained(
        model_path, 
        torch_dtype=torch.bfloat16
    )
    
    # Move to GPU if available
    if torch.cuda.is_available():
        print("Using CUDA GPU")
        pipe.to("cuda")
    else:
        print("CUDA not available, using CPU (this will be slow)")
        pipe.to("cpu")

    print(f"Generating image for prompt: {prompt}")
    
    # Generate
    image = pipe(
        prompt,
        guidance_scale=0.0,
        num_inference_steps=4, # Schnell is optimized for 4 steps
        max_sequence_length=256,
        generator=torch.Generator("cpu").manual_seed(42)
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
