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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "SwissTech Briefing - News aus der Schweizer Tech-Szene",
  description: "Kuratiertes Medium für KI, Startups und Technologie in der Schweiz.",
};

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

        {/*
         * ── 1. Consent Mode v2 Bootstrap ──
         * RAW <script> tag so it's in the STATIC HTML that Google's crawler sees.
         * MUST be BEFORE the gtag.js loader.
         */}
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

        {/*
         * ── 2. GA4 Global Site Tag ──
         * RAW <script> tags so Google's tag checker sees them in the HTML source.
         * This is the ONLY way Google can detect the tag during verification.
         */}
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
        {/* Consent Mode updater (listens for CMP changes) */}
        <GoogleConsentMode />
        {children}
        {/* Cookie consent banner */}
        <CookieBanner />
        {/* Analytics — GA4 (consent-gated page view tracker) */}
        <AnalyticsLoader />
        {/* AdSense script loader (marketing consent-gated) */}
        <AdSenseLoader />
      </body>
    </html>
  );
}
