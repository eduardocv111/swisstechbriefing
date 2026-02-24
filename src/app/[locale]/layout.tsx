import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import CookieBanner from "@/components/consent/CookieBanner";
import GaPageViewTracker from "@/components/analytics/GaPageViewTracker";
import AdSenseLoader from "@/components/consent/AdSenseLoader";
import { locales, Locale } from "@/i18n/config";
import { SITE_CONFIG } from "@/lib/seo/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { GA_ID } from "@/lib/ga";

const publicSans = Public_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-public-sans",
});

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return {
        title: {
            default: SITE_CONFIG.name,
            template: `%s | ${SITE_CONFIG.name}`,
        },
        description: dict.footer.description,
        metadataBase: new URL(SITE_CONFIG.url),
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <html lang={locale} className="dark" suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
                    rel="stylesheet"
                />
                <meta name="google-adsense-account" content="ca-pub-1495161909176032" />

                {/* 1. Consent Mode Default Initialization - MUST be beforeInteractive */}
                <Script id="google-consent-default" strategy="beforeInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        window.gtag = gtag;

                        // Try to read existing consent from LocalStorage to avoid flicker
                        const consentKey = "stb_user_consent_v2";
                        const stored = localStorage.getItem(consentKey);
                        const consent = stored ? JSON.parse(stored) : null;

                        gtag('consent', 'default', {
                            'ad_storage': consent ? consent.marketing : 'denied',
                            'ad_user_data': consent ? consent.marketing : 'denied',
                            'ad_personalization': consent ? consent.marketing : 'denied',
                            'analytics_storage': consent ? consent.analytics : 'denied',
                            'wait_for_update': 500
                        });

                        gtag('js', new Date());
                    `}
                </Script>

                {/* 2. Main GA4 Script */}
                {GA_ID && (
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                )}

                {/* 3. GA4 Initial Config (Manual Page View disabled to maintain control) */}
                {GA_ID && (
                    <Script id="ga-config" strategy="afterInteractive">
                        {`
                            gtag('config', '${GA_ID}', {
                                send_page_view: false,
                                anonymize_ip: true,
                                cookie_flags: 'SameSite=Lax;Secure'
                            });
                        `}
                    </Script>
                )}
            </head>
            <body
                className={`${publicSans.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
            >
                {children}

                {/* Professional UI and Navigation Tracking */}
                <CookieBanner dict={dict.cookies} />
                <Suspense fallback={null}>
                    <GaPageViewTracker />
                </Suspense>
                <AdSenseLoader />
            </body>
        </html>
    );
}
