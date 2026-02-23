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
      </head>
      <body
        className={`${publicSans.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        {/* ── Consent Mode v2 MUST be first (sets defaults before any Google script) ── */}
        <GoogleConsentMode />
        {children}
        {/* Cookie consent banner */}
        <CookieBanner />
        {/* Analytics — GA4 (consent-gated) */}
        <AnalyticsLoader />
        {/* AdSense script loader (marketing consent-gated) */}
        <AdSenseLoader />
      </body>
    </html>
  );
}
