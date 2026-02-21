'use client';

export default function NewsletterInlineCard() {
    return (
        <section className="my-8 p-6 md:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                    Wöchentliche Einordnung zu KI, Startups und Technologie in der Schweiz
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    Ein kuratierter Überblick mit relevanten Entwicklungen, Einordnung und Hintergründen aus der Schweizer Tech-Szene. Kein Spam. Kein Clickbait.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 mb-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Ihre E-Mail-Adresse"
                        required
                        type="email"
                    />
                    <button
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
                        type="submit"
                    >
                        Jetzt abonnieren
                    </button>
                </form>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 italic">
                    Wir respektieren Ihre Privatsphäre. Abmeldung jederzeit möglich.
                </p>
            </div>
        </section>
    );
}
