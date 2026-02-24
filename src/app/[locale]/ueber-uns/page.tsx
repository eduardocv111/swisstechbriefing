import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/lib/seo/site';
import { Metadata } from 'next';
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/config';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return {
        title: `${dict.about.meta_title} | ${SITE_CONFIG.name}`,
        description: dict.about.meta_description,
    };
}

export default async function UeberUnsPage({ params }: Props) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Header locale={locale} />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 dark:text-white leading-tight">
                        {dict.about.title}
                    </h1>

                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                            {dict.about.mission}
                        </p>

                        <h2 className="text-2xl font-bold mt-12 mb-6">{dict.about.focus_title}</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">{dict.about.focus.ki.title}</h3>
                                <p className="text-sm">{dict.about.focus.ki.desc}</p>
                            </li>
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">{dict.about.focus.defense.title}</h3>
                                <p className="text-sm">{dict.about.focus.defense.desc}</p>
                            </li>
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">{dict.about.focus.startups.title}</h3>
                                <p className="text-sm">{dict.about.focus.startups.desc}</p>
                            </li>
                            <li className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">{dict.about.focus.regulation.title}</h3>
                                <p className="text-sm">{dict.about.focus.regulation.desc}</p>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-16 mb-6">{dict.about.transparency_title}</h2>
                        <div className="bg-primary/5 p-8 rounded-2xl border-l-4 border-primary italic text-slate-700 dark:text-slate-300">
                            "{dict.about.transparency_text}"
                        </div>

                        <h2 className="text-2xl font-bold mt-16 mb-6">{dict.about.editorial_title}</h2>
                        <p>
                            {dict.about.editorial_text}
                        </p>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </div>
    );
}
