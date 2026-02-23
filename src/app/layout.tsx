import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import GoogleConsentMode from "@/components/consent/GoogleConsentMode";
import CookieBanner from "@/components/consent/CookieBanner";
import AnalyticsLoader from "@/components/consent/AnalyticsLoader";
import AdSenseLoader from "@/components/consent/AdSenseLoader";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "SwissTech Briefing - News aus der Schweizer Tech-Szene",
  description: "Kuratiertes Medium für KI, Startups und Technologie in der Schweiz.",
};

import Script from "next/script";
import { GA_ID } from "@/lib/ga";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
        <meta name="google-adsense-account" content="ca-pub-1495161909176032" />

        {/* ── 1. Google Consent Mode v2 Bootstrap (Requirement 1, 2, 3) ── */}
        <Script id="google-consent-mode-v2" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set defaults to denied
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            
            // Security & Privacy overrides
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>

        {/* ── 2. GA4 Global Site Tag (Requirement 4, 5) ── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-config" strategy="afterInteractive">
              {`
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=Lax;Secure',
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}

      </head>
      <body
        className={`${publicSans.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        {/* ── Consent Mode v2 MUST be first (sets defaults before any Google script) ── */}
        <GoogleConsentMode />
        {children}
        {/* Cookie consent banner */}
        <CookieBanner />
        {/* Analytics — GA4 (consent-gated trackers) */}
        <AnalyticsLoader />
        {/* AdSense script loader (marketing consent-gated) */}
        <AdSenseLoader />
      </body>
    </html>
  );
}
