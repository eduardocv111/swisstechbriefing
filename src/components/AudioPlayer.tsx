"use client";

import React, { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
    src: string;
    locale: string;
    dict: {
        play?: string;
        pause?: string;
        listen?: string;
    };
}

export default function AudioPlayer({ src, locale, dict }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration > 0) {
            setProgress((current / duration) * 100);
        }
    };

    if (!src) return null;

    return (
        <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white/50 p-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/50 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                    aria-label={isPlaying ? dict.pause : dict.play}
                >
                    <span className="material-symbols-outlined text-2xl">
                        {isPlaying ? "pause" : "play_arrow"}
                    </span>
                </button>

                <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                            {dict.listen || "Listen to this article"}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                            AI Voice Clone Beta
                        </span>
                    </div>

                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                            className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <div className="flex gap-0.5">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 rounded-full bg-primary/30 ${isPlaying ? 'animate-pulse' : ''}`}
                                style={{
                                    height: `${Math.random() * 20 + 5}px`,
                                    animationDelay: `${i * 0.1}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
            />
        </div>
    );
}
