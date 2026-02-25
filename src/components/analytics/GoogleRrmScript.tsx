"use client";

import Script from "next/script";

/**
 * Google Reader Revenue Manager (RRM) Integration
 * 
 * Provides technical synchronization for Publisher Center.
 * Should be loaded primarily on article pages.
 */
export default function GoogleRrmScript() {
    const productId = process.env.NEXT_PUBLIC_GOOGLE_RRM_PRODUCT_ID || "CAowhd-2DA:openaccess";

    return (
        <>
            {/* 1. Official SWG Basic Script */}
            <Script
                src="https://news.google.com/swg/js/v1/swg-basic.js"
                strategy="afterInteractive"
            />

            {/* 2. Initialization Configuration */}
            <Script id="google-rrm-init" strategy="afterInteractive">
                {`
                    (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
                        basicSubscriptions.init({
                            type: "NewsArticle",
                            isPartOfType: ["Product"],
                            isPartOfProductId: "${productId}",
                            clientOptions: { 
                                theme: "light", 
                                lang: "de" 
                            },
                        });
                        
                        // TODO: Add custom CTA hooks here for newsletter/subscriptions
                        // console.log("[Google RRM] Initialized with product:", "${productId}");
                    });
                `}
            </Script>
        </>
    );
}
