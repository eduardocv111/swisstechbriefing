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
        title: `${dict.contact.meta_title} | ${SITE_CONFIG.name}`,
        description: dict.contact.meta_description,
    };
}

export default async function KontaktPage({ params }: Props) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Header locale={locale} />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
                        {dict.contact.title}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                        {dict.contact.subtitle}
                    </p>

                    <div className="grid gap-8 text-left">
                        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                {dict.contact.editorial_title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-2">{dict.contact.editorial_desc}</p>
                            <a href="mailto:redaktion@swisstechbriefing.ch" className="text-primary font-bold hover:underline">
                                redaktion@swisstechbriefing.ch
                            </a>
                        </section>

                        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">campaign</span>
                                {dict.contact.media_title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-2">{dict.contact.media_desc}</p>
                            <a href="mailto:media@swisstechbriefing.ch" className="text-primary font-bold hover:underline">
                                media@swisstechbriefing.ch
                            </a>
                        </section>

                        <section className="bg-primary/5 p-8 rounded-2xl border border-primary/20 text-center">
                            <h2 className="text-xl font-bold mb-4">{dict.contact.cta_title}</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                {dict.contact.cta_desc}
                            </p>
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all">
                                {dict.contact.cta_button}
                            </button>
                        </section>
                    </div>
                </div>
            </main>
            <Footer locale={locale} />
        </div>
    );
}
