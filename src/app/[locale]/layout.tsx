import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "../globals.css";
import GoogleConsentMode from "@/components/consent/GoogleConsentMode";
import CookieBanner from "@/components/consent/CookieBanner";
import AnalyticsLoader from "@/components/consent/AnalyticsLoader";
import AdSenseLoader from "@/components/consent/AdSenseLoader";
import { locales } from "@/i18n/config";

const publicSans = Public_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-public-sans",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "SwissTech Briefing",
    description: "Kuratiertes Medium für KI, Startups und Technologie in der Schweiz.",
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <html lang={locale} className="dark">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
                    rel="stylesheet"
                />
                <meta name="google-adsense-account" content="ca-pub-1495161909176032" />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });

              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', true);
            `,
                    }}
                />

                {GA_ID && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  if(!window.gtag){function gtag(){dataLayer.push(arguments);} window.gtag = gtag;}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=Lax;Secure',
                    send_page_view: true
                  });
                `,
                            }}
                        />
                    </>
                )}
            </head>
            <body
                className={`${publicSans.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
            >
                <GoogleConsentMode />
                {children}
                <CookieBanner />
                <AnalyticsLoader />
                <AdSenseLoader />
            </body>
        </html>
    );
}
