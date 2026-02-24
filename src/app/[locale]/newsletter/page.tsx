import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/config';

/**
 * NewsletterPage - Dedicated landing page for newsletter subscriptions.
 * Refactored to Server Component to allow importing Header/Footer without build errors.
 * Signup logic is moved to NewsletterForm (Client Component).
 */
export default async function NewsletterPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <div className="flex min-h-screen flex-col">
            <Header locale={locale} />

            <main className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-xl w-full">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden" aria-live="polite">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/5 rounded-full blur-3xl" />

                        <NewsletterForm dict={dict.newsletter} />
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
