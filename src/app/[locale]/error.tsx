'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Etwas ist schief gelaufen</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                Es gab ein Problem beim Laden dieser Seite. Unser Team wurde benachrichtigt.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="bg-primary text-white font-bold py-2.5 px-6 rounded-full hover:bg-primary/90 transition-all"
                >
                    Erneut versuchen
                </button>
                <Link
                    href="/"
                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-2.5 px-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                    Zur Startseite
                </Link>
            </div>
        </div>
    );
}
