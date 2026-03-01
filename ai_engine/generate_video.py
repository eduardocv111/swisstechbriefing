import sys
import os
import json

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

def generate_ltx_cover(prompt, input_image_path, output_path):
    """
    Usa LTX-Video para animar una portada (img2vid ligero).
    """
    print(f"[Python-Video] Animating Hero with LTX: {prompt}...", flush=True)

    # Liberar memoria previa por si acaso
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    
    from ltx_video.inference import infer, InferenceConfig
    
    # Path al nuevo config FP8 (Ligero y potente)
    ltx_config_yaml = os.path.join(PROJECT_MODELS, "LTX-Video", "configs", "ltxv-2b-fp8.yaml")
    
    config = InferenceConfig(
        prompt=prompt,
        input_media_path=input_image_path,
        output_path=output_path,
        pipeline_config=ltx_config_yaml,
        height=480, # Multiple of 32
        width=704,  # Multiple of 32
        num_frames=41, # Slightly shorter for higher reliability
        frame_rate=16, # Cinematic but fluid
        seed=42,
        negative_prompt="low quality, blurry, distorted, inconsistent, static, watermark, text, signature",
        offload_to_cpu=False 
    )
    
    # El repo de LTX-Video espera el objeto config directamente
    infer(config)
    return output_path

def generate_wan_clip(prompt, output_path):
    """
    Usa Wan2.2 para un clip técnico interno de alta calidad.
    """
    print(f"[Python-Video] Generating high-end Wan clip: {prompt}...")
    # Import dinámico de Wan
    import wan
    from wan.configs import WAN_CONFIGS
    
    ckpt_dir = os.path.join(PROJECT_MODELS, "Wan2.2-TI2V-5B")
    task = "t2v-A14B" # O ti2v si usáramos imagen
    
    wan_t2v = wan.WanT2V(
        config=WAN_CONFIGS[task],
        checkpoint_dir=ckpt_dir,
        device_id=0,
        rank=0
    )
    
    video = wan_t2v.generate(
        prompt,
        size=(1280, 720),
        frame_num=81,
        seed=42
    )
    
    # Guardar usando utilidades de wan
    from wan.utils.utils import save_video
    save_video(video[None], output_path, fps=16, normalize=True, value_range=(-1, 1))
    return output_path

if __name__ == "__main__":
    # Leer JSON de instrucciones desde stdin para integración limpia con Node.js
    try:
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
