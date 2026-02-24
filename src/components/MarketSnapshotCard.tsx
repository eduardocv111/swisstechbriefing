import React from "react";
import { formatSwissDate } from "@/lib/formatDate";

interface MarketSnapshotCardProps {
    createdAt: string;
    payload: {
        fx: {
            USDCHF: number;
            EURCHF: number;
        };
        indices: {
            QQQ: {
                price: number;
                change: number;
                changePercent: string;
            };
            SPY: {
                price: number;
                change: number;
                changePercent: string;
            };
        };
    };
}

export default function MarketSnapshotCard({ createdAt, payload }: MarketSnapshotCardProps) {
    const { fx, indices } = payload;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col items-center justify-between border-b border-slate-100 px-4 py-2 dark:border-slate-800 sm:flex-row">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Market Snapshot
                    </h3>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    Last updated: {formatSwissDate(createdAt)}
                </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 md:grid-cols-4">
                {/* FX: USD/CHF */}
                <div className="flex flex-col p-4 text-center">
                    <span className="mb-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500">USD/CHF</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{fx.USDCHF.toFixed(4)}</span>
                </div>

                {/* FX: EUR/CHF */}
                <div className="flex flex-col p-4 text-center">
                    <span className="mb-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500">EUR/CHF</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{fx.EURCHF.toFixed(4)}</span>
                </div>

                {/* Index: QQQ */}
                <div className="flex flex-col p-4 text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">QQQ (Nasdaq 100)</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">${indices.QQQ.price.toFixed(2)}</span>
                        <span className={`text-[10px] font-bold ${indices.QQQ.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {indices.QQQ.change >= 0 ? '+' : ''}{indices.QQQ.changePercent}
                        </span>
                    </div>
                </div>

                {/* Index: SPY */}
                <div className="flex flex-col p-4 text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">SPY (S&P 500)</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">${indices.SPY.price.toFixed(2)}</span>
                        <span className={`text-[10px] font-bold ${indices.SPY.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {indices.SPY.change >= 0 ? '+' : ''}{indices.SPY.changePercent}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
