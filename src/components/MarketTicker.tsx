"use client";

import React, { useMemo } from "react";

type MarketTickerProps = {
    initial: {
        created_at: string;
        payload: any;
    } | null;
};

export default function MarketTicker({ initial }: MarketTickerProps) {
    // Memoize items to avoid unnecessary re-renders
    const items = useMemo(() => {
        if (!initial || !initial.payload) return [];

        const { fx, markets } = initial.payload;
        const data = [];

        // FX Rates
        if (fx) {
            if (fx.usd_chf) data.push({ label: "USD/CHF", value: fx.usd_chf.toFixed(4), change: 0, isFx: true });
            if (fx.eur_chf) data.push({ label: "EUR/CHF", value: fx.eur_chf.toFixed(4), change: 0, isFx: true });
        }

        // Market Indices
        if (markets) {
            if (markets.qqq) {
                data.push({
                    label: "QQQ (Nasdaq 100)",
                    value: `$${markets.qqq.price.toFixed(2)}`,
                    change: markets.qqq.change,
                    percent: markets.qqq.change_percent,
                });
            }
            if (markets.spy) {
                data.push({
                    label: "SPY (S&P 500)",
                    value: `$${markets.spy.price.toFixed(2)}`,
                    change: markets.spy.change,
                    percent: markets.spy.change_percent,
                });
            }
        }

        return data;
    }, [initial]);

    if (items.length === 0) {
        return (
            <div className="w-full bg-slate-900/50 border-y border-white/5 py-1.5 overflow-hidden">
                <div className="flex justify-center text-[10px] font-bold uppercase tracking-widest text-slate-500 animate-pulse">
                    ••• Market Snapshot wird täglich aktualisiert •••
                </div>
            </div>
        );
    }

    // Double the items for a seamless loop
    const tickerItems = [...items, ...items, ...items];

    return (
        <div className="group relative w-full bg-[#0a0f1a] border-y border-white/5 overflow-hidden h-9 flex items-center select-none font-mono">
            {/* Container for the marquee animation */}
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
                {tickerItems.map((item, idx) => (
                    <div key={idx} className="flex items-center px-6 gap-3 border-r border-white/10 h-full">
                        <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase whitespace-nowrap">
                            {item.label}
                        </span>
                        <span className="text-[11px] font-bold text-white tracking-tight">
                            {item.value}
                        </span>
                        {!item.isFx && (
                            <span className={`inline-flex items-center gap-0.5 text-[10px] font-black ${item.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                {item.change >= 0 ? "▲" : "▼"} {item.percent}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* CSS for the Marquee - Using style tag for simplicity and portable animation */}
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

            {/* Bloomberg-style Edge Gradient overlays for smoothness */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0f1a] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0f1a] to-transparent pointer-events-none z-10" />
        </div>
    );
}
