import sys
import os
import json
import io

# Fix encoding issues on Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# 🔥 SOLUCIÓN FRAGMENTACIÓN: Configurar antes de importar torch
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

import torch
import torch.nn.functional as F
from pathlib import Path
from PIL import Image

# 1. Configuración de Rutas Locales (In-Project Engine)
PROJECT_MODELS = os.path.join(os.path.dirname(__file__), "models")

# Añadir repositorios al path (ahora locales)
sys.path.insert(0, os.path.join(PROJECT_MODELS, "LTX-Video"))
sys.path.insert(0, os.path.join(PROJECT_MODELS, "Wan2.2"))

def enhance_prompt(base_prompt):
    """
    Expands the basic prompt with cinematic and high-end descriptors
    to ensure professional visual quality.
    """
    modifiers = [
        "cinematic motion",
        "slow panning",
        "high detail 4k",
        "professional studio lighting",
        "hyper-realistic textures",
        "smooth camera glide",
        "highly detailed",
        "8k resolution look"
    ]
    return f"{base_prompt}, {', '.join(modifiers)}"

def interpolate_video(input_path, target_fps=60):
    """
    Uses FFmpeg to perform RIFE-style frame interpolation (Motion Compensated Interpolation).
    This creates ultra-smooth motion (60fps) from the raw 16fps generation.
    """
    import subprocess
    temp_output = input_path.replace(".mp4", "_interpolated.mp4")
    print(f"[Python-Video] Interpolating to {target_fps} FPS for maximum smoothness...", flush=True)
    
    # minterpolate with MCI (Motion Compensated Interpolation)
    # fps=60: target frame rate
    # mi_mode=mci: Motion compensated interpolation (RIFE style)
    # me_mode=bidir: Bidirectional motion estimation
    cmd = [
        "ffmpeg", "-y", "-i", input_path,
        "-vf", f"minterpolate=fps={target_fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsfm=1",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
        temp_output
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        # Replace original with interpolated
        os.replace(temp_output, input_path)
        print(f"[Python-Video] ✅ Interpolation successful.", flush=True)
    except Exception as e:
        print(f"[Python-Video] ⚠️ Interpolation failed: {e}", flush=True)

def generate_ltx_cover(prompt, input_image_path, output_path):
    """
    Usa LTX-Video para animar una portada (img2vid ligero).
    """
    enhanced_prompt = enhance_prompt(prompt)
    print(f"[Python-Video] Animating Hero with Enhanced Prompt: {enhanced_prompt}...", flush=True)

    # Liberar memoria previa por si acaso
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    
    from ltx_video.inference import infer, InferenceConfig
    
    # Path al nuevo config FP8 (Ligero y potente)
    ltx_config_yaml = os.path.join(PROJECT_MODELS, "LTX-Video", "configs", "ltxv-2b-fp8.yaml")
    
    config = InferenceConfig(
        prompt=enhanced_prompt,
        input_media_path=input_image_path,
        output_path=output_path,
        pipeline_config=ltx_config_yaml,
        height=480, # Multiple of 32
        width=704,  # Multiple of 32
        num_frames=41, # Slightly shorter for higher reliability
        frame_rate=16, # Base generation rate
        seed=42,
        negative_prompt="low quality, blurry, distorted, inconsistent, static, watermark, text, signature, glitch, deformed faces",
        offload_to_cpu=False 
    )
    
    # El repo de LTX-Video espera el objeto config directamente
    infer(config)
    
    # PREMUM STEP: Interpolate to 60fps
    interpolate_video(output_path, target_fps=60)
    
    return output_path

def generate_wan_clip(prompt, output_path):
    """
    Usa Wan2.2 para un clip técnico interno de alta calidad.
    """
    enhanced_prompt = enhance_prompt(prompt)
    print(f"[Python-Video] Generating high-end Wan clip: {enhanced_prompt}...")
    # Import dinámico de Wan
    import wan
    from wan.configs import WAN_CONFIGS
    
    ckpt_dir = os.path.join(PROJECT_MODELS, "Wan2.2-TI2V-5B")
    task = "t2v-A14B" 
    
    wan_t2v = wan.WanT2V(
        config=WAN_CONFIGS[task],
        checkpoint_dir=ckpt_dir,
        device_id=0,
        rank=0
    )
    
    video = wan_t2v.generate(
        enhanced_prompt,
        size=(1280, 720),
        frame_num=81,
        seed=42
    )
    
    # Guardar usando utilidades de wan
    from wan.utils.utils import save_video
    save_video(video[None], output_path, fps=16, normalize=True, value_range=(-1, 1))
    
    # PREMUM STEP: Interpolate to 60fps
    interpolate_video(output_path, target_fps=60)
    
    return output_path

if __name__ == "__main__":
    # Leer JSON de instrucciones desde stdin para integración limpia con Node.js
    try:
        # Check for --test mode
        if len(sys.argv) > 1 and sys.argv[1] == "--test":
            print("[Python-Video] RUNNING IN TEST MODE")
            test_prompt = "A high-tech laboratory in Switzerland, futuristic computers, blue lights"
            test_output = "test_video.mp4"
            # generate_ltx_cover expects internal image for img2vid usually, dummy check
            # For test let's simulate a T2V or a simple run
            pass

        data = json.load(sys.stdin)
        task = data.get("task")
        prompt = data.get("prompt")
        output_path = data.get("output_path")
        
        if task == "ltx_cover":
            input_img = data.get("input_image")
            generate_ltx_cover(prompt, input_img, output_path)
        elif task == "wan_clip":
            generate_wan_clip(prompt, output_path)
            
        print(f"SUCCESS|{output_path}", flush=True)
        # Force immediate exit to prevent PyTorch/CUDA hangs on cleanup
        os._exit(0)
        
    except Exception as e:
        print(f"ERROR|{str(e)}", file=sys.stderr, flush=True)
        os._exit(1)
