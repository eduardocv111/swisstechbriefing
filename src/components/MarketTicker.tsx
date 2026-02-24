"use client";

import React, { useMemo } from "react";

type MarketTickerProps = {
    initial: {
        created_at: string;
        payload: any;
    } | null;
};

export default function MarketTicker({ initial }: MarketTickerProps) {
    const { items, ageStatus } = useMemo(() => {
        if (!initial || !initial.payload) return { items: [], ageStatus: null };

        const { fx, markets } = initial.payload;
        const data = [];

        // Formatting FX data
        if (fx) {
            if (fx.usd_chf) data.push({ label: "USD/CHF", value: fx.usd_chf.toFixed(4), change: 0, isFx: true });
            if (fx.eur_chf) data.push({ label: "EUR/CHF", value: fx.eur_chf.toFixed(4), change: 0, isFx: true });
        }

        // Formatting Market data
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

        // Calculate Age Status
        const now = Date.now();
        const createdDate = new Date(initial.created_at).getTime();
        const diffMs = now - createdDate;
        const diffMin = Math.floor(diffMs / 60000);

        let status: "LIVE" | "DELAYED" | "STALE" = "STALE";
        let timeStr = "";

        if (isNaN(createdDate)) {
            status = "STALE";
            timeStr = "N/A";
        } else {
            if (diffMin < 45) {
                status = "LIVE";
            } else if (diffMin < 180) {
                status = "DELAYED";
            } else {
                status = "STALE";
            }

            // Format time string
            const h = Math.floor(diffMin / 60);
            const m = diffMin % 60;
            if (h > 0) {
                timeStr = `${h}h${m > 0 ? ` ${m}m` : ""}`;
            } else {
                timeStr = `${m}m`;
            }
        }

        return { items: data, ageStatus: { status, timeStr, diffMin } };
    }, [initial]);

    if (items.length === 0 || !ageStatus) {
        return (
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-10 bg-slate-950 border-y border-white/5 overflow-hidden flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 font-mono">
                        System Terminal • Initializing Market Stream
                    </span>
                </div>
            </div>
        );
    }

    // Bloomberg logic: Duplicate items to ensure seamless loop
    // Double duplication for guaranteed continuous flow
    const displayItems = [...items, ...items, ...items];

    const statusColors = {
        LIVE: "bg-emerald-400",
        DELAYED: "bg-amber-400",
        STALE: "bg-rose-400",
    };

    return (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-10 bg-slate-950 border-t border-white/5 border-b border-white/10 flex items-center select-none overflow-hidden group z-40 transition-all duration-700" aria-label={`Market data ${ageStatus.status}. Updated ${ageStatus.timeStr} ago.`}>

            {/* Live Indicator Section - Fixed with a subtle depth effect */}
            <div className="flex shrink-0 items-center px-4 bg-slate-950 z-30 border-r border-white/10 h-full shadow-[5px_0_15px_-5px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColors[ageStatus.status]} ${ageStatus.status === "LIVE" ? "animate-pulse" : ""}`}></span>
                    <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white uppercase">
                        <span>{ageStatus.status}</span>
                        <span className="opacity-20">•</span>
                        <span className="text-slate-500">{ageStatus.timeStr}</span>
                    </div>
                </div>
            </div>

            {/* Marquee Track - Optimized for maximum buttery smoothness */}
            <div className="flex whitespace-nowrap animate-marquee-track group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
                {displayItems.map((item, idx) => (
                    <div key={idx} className="flex items-center px-9 gap-3 h-10 relative">
                        {/* Progressive Opacity Separator */}
                        <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase font-mono">
                            {item.label}
                        </span>
                        <span className="text-[11px] font-bold text-slate-100 tabular-nums font-mono">
                            {item.value}
                        </span>
                        {!item.isFx && (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold tabular-nums font-mono transition-all duration-300 ${item.change >= 0
                                    ? "text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(110,231,183,1)]"
                                    : "text-rose-300 group-hover:drop-shadow-[0_0_8px_rgba(252,165,165,0.4)]"
                                }`}>
                                {item.change >= 0 ? "▲" : "▼"}
                                <span>{item.percent}</span>
                            </span>
                        )}
                        {item.isFx && (
                            <span className="text-[9px] font-black text-slate-700 font-mono tracking-tighter uppercase opacity-50">FX</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Premium Edge Gradients - Expanded for deeper terminal immersion */}
            <div className="absolute inset-y-0 left-24 w-48 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10" />

            <style jsx>{`
                @keyframes marquee-track {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33333%); }
                }
                .animate-marquee-track {
                    animation: marquee-track 42s linear infinite;
                    will-change: transform;
                    /* Ensure sub-pixel rendering for smoothness */
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-marquee-track {
                        animation: none;
                        overflow-x: auto;
                    }
                }
            `}</style>
        </div>
    );
}
