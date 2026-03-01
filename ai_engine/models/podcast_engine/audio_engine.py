import sys
import os
import json
import argparse
import io

# Fix encoding issues on Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
import torch
import requests

# Map our app locales to XTTS language codes
LOCALE_MAP = {
    'de-CH': 'de',
    'en': 'en',
    'es-ES': 'es',
    'fr-CH': 'fr',
    'it-CH': 'it'
}

def refine_to_dialect(text, locale):
    """
    Translates standard German to Swiss German dialect (Schwiizerdütsch) 
    using local Ollama or OpenClaw if available.
    """
    if locale != 'de-CH':
        return text
    
    print(f"[Podcast Engine] 🇨🇭 Transforming to Swiss German Dialect (Schwiizerdütsch)...")
    
    prompt = f"Translate the following standard German news text into authentic Swiss German dialect (Schwiizerdütsch). Keep it professional but natural for Zurich/Bern area. ONLY output the translated text, no meta-comments:\n\n{text}"
    
    try:
        # Try local Ollama (Llama 3.1 is good for this)
        response = requests.post("http://127.0.0.1:11434/api/generate", json={
            "model": "llama3.1:8b",
            "prompt": prompt,
            "stream": False
        }, timeout=30)
        
        if response.status_code == 200:
            dialect_text = response.json().get('response', text)
            print(f"[Podcast Engine] ✅ Dialect transformation successful.")
            return dialect_text
    except Exception as e:
        print(f"[Podcast Engine] ⚠️ Dialect transformation failed: {e}. Using original text.")
    
    return text

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--article", required=True)
    parser.add_argument("--locale", default="de-CH")
    parser.add_argument("--output", required=True)
    parser.add_argument("--voice_ref", default=None)
    args = parser.parse_args()

    # 1. Parse article data
    try:
        data = json.loads(args.article)
        title = data.get('title', 'News')
        excerpt = data.get('excerpt', '')
        # Construct the text to speak
        raw_text = f"{title}. {excerpt}"
        
        # Dialect refinement if needed
        text_to_speak = refine_to_dialect(raw_text, args.locale)
        
    except Exception as e:
        print(f"Error parsing article data: {e}")
        sys.exit(1)

    # 2. Setup paths
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # Use provided voice_ref or default
    voice_ref = args.voice_ref
    if not voice_ref or not os.path.exists(voice_ref):
        voice_ref = os.path.join(base_dir, "voice_clones", "wife_reference.wav")
    
    if not os.path.exists(voice_ref):
        print(f"Reference voice not found at {voice_ref}. XTTS might fail.")
    
    # 3. Initialize TTS (XTTS v2)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"[Podcast Engine] Initializing XTTS v2 on {device}...")
    
    try:
        from TTS.api import TTS
        # Load model (automatic download if missing)
        tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
        
        lang = LOCALE_MAP.get(args.locale, 'de')
        
        print(f"[Podcast Engine] Generating audio for {args.locale} (lang={lang})...")
        print(f"[Podcast Engine] Using Voice Ref: {voice_ref}")
        
        # Generate!
        tts.tts_to_file(
            text=text_to_speak,
            speaker_wav=voice_ref,
            language=lang,
            file_path=args.output
        )
        
        print(f"SUCCESS|{args.output}")
        
    except Exception as e:
        print(f"❌ Error generating podcast: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
