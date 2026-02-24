"use client";

import React, { useMemo } from "react";

type MarketTickerProps = {
    initial: {
        created_at: string;
        payload: any;
    } | null;
};

export default function MarketTicker({ initial }: MarketTickerProps) {
    const items = useMemo(() => {
        if (!initial || !initial.payload) return [];

        const { fx, markets } = initial.payload;
        const data = [];

        if (fx) {
            if (fx.usd_chf) data.push({ label: "USD/CHF", value: fx.usd_chf.toFixed(4), change: 0, isFx: true });
            if (fx.eur_chf) data.push({ label: "EUR/CHF", value: fx.eur_chf.toFixed(4), change: 0, isFx: true });
        }

        if (markets) {
            if (markets.qqq) {
                data.push({
                    label: "QQQ",
                    value: `$${markets.qqq.price.toFixed(2)}`,
                    change: markets.qqq.change,
                    percent: markets.qqq.change_percent,
                });
            }
            if (markets.spy) {
                data.push({
                    label: "SPY",
                    value: `$${markets.spy.price.toFixed(2)}`,
                    change: markets.spy.change,
                    percent: markets.spy.change_percent,
                });
            }
        }

        return data;
    }, [initial]);

    // If no items, show a static placeholder to avoid empty space
    if (items.length === 0) {
        return (
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#0a0f1a] border-y border-white/5 py-2 overflow-hidden flex justify-center items-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 animate-pulse">
                    ••• MARKET SNAPSHOT UPDATING ••• MARKET SNAPSHOT UPDATING ••• MARKET SNAPSHOT UPDATING •••
                </div>
            </div>
        );
    }

    // Repeat items many times to ensure the screen is ALWAYS full from tip to tip
    // 10 repetitions ensures coverage even on 4K/Ultra-wide monitors
    const tickerItems = Array(10).fill(items).flat();

    return (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#0a0f1a] border-y border-white/5 h-10 flex items-center select-none overflow-hidden group">
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
                {tickerItems.map((item, idx) => (
                    <div key={idx} className="flex items-center px-10 gap-3 border-r border-white/5 h-10 leading-10">
                        <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase font-mono">
                            {item.label}
                        </span>
                        <span className="text-[11px] font-bold text-white tracking-tight font-mono">
                            {item.value}
                        </span>
                        {!item.isFx && (
                            <span className={`inline-flex items-center gap-0.5 text-[10px] font-black font-mono ${item.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                                {item.change >= 0 ? "▲" : "▼"} {item.percent}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-10%); } /* -10% because we have 10 repetitions of the original set */
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

            {/* Edge Gradients - Smoother transition at the tips of the screen */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent pointer-events-none z-10" />
        </div>
    );
}
