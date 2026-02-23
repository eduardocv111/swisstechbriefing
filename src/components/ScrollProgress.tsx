'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress(Math.min((scrollTop / docHeight) * 100, 100));
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-12 md:top-14 left-0 right-0 z-50 h-[3px] bg-transparent">
            <div
                className="h-full bg-gradient-to-r from-primary to-blue-400 transition-[width] duration-100 ease-out shadow-sm shadow-primary/30"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
