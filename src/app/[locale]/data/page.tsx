import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from "@/i18n/config";
import { getLatestMarketSnapshot } from "@/lib/market.repo";
import Database from "better-sqlite3";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const url = process.env.DATABASE_URL || "file:./data/stb.db";
const DB_PATH = url.startsWith("file:") ? url.replace("file:", "") : url;

async function getLatestSnapshot(table: string) {
    try {
        const db = new Database(DB_PATH);
        const row = db
            .prepare(`SELECT created_at, payload_json FROM ${table} ORDER BY id DESC LIMIT 1`)
            .get() as { created_at: string; payload_json: string } | undefined;
        db.close();
        if (!row) return null;
        return { created_at: row.created_at, payload: JSON.parse(row.payload_json) };
    } catch (e) {
        return null;
    }
}

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function DataPage({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    const market = getLatestMarketSnapshot();
    const macro = await getLatestSnapshot("macro_snapshots");
    const snb = await getLatestSnapshot("snb_snapshots");
    const openData = await getLatestSnapshot("swiss_open_data_snapshots");

    return (
        <div className="flex min-h-screen flex-col bg-slate-950">
            <Header locale={locale} />
            <CategoryTabs locale={locale} />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 md:py-20">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Terminal <span className="text-primary italic">Intelligence</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Real-time macroeconomic data and market intelligence layers for Switzerland and global markets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* CARD 1: MARKETS */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Markets</span>
                            {market && <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span className="text-[10px] text-slate-500 font-mono">LIVE</span></div>}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-4">Market Snapshot</h2>
                        {market ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Nasdaq (QQQ)</p>
                                        <p className="text-lg font-mono font-bold text-white">${market.payload.markets.qqq.price.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">S&P 500 (SPY)</p>
                                        <p className="text-lg font-mono font-bold text-white">${market.payload.markets.spy.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-600 font-mono italic">Source: Financial APIs / STB Terminal</div>
                            </div>
                        ) : (
                            <p className="text-slate-600 italic">No market data available.</p>
                        )}
                    </div>

                    {/* CARD 2: MACRO (FRED) */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Macro (Global)</span>
                            {macro && <span className="text-[10px] text-slate-500 font-mono uppercase">FRED API</span>}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-4">Federal Reserve Data</h2>
                        {macro ? (
                            <div className="space-y-3">
                                {Object.values(macro.payload.series).map((s: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                        <span className="text-xs text-slate-400">{s.label}</span>
                                        <span className="text-xs font-mono font-bold text-white">{s.value}{s.unit === '%' ? '%' : ''}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-600 italic">Macro data stream initializing...</p>
                        )}
                    </div>

                    {/* CARD 3: SWITZERLAND (SNB) */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-2 py-1 rounded">Swiss Monetary</span>
                            {snb && <span className="text-[10px] text-slate-500 font-mono uppercase">SNB Data Portal</span>}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-4">SNB Operations</h2>
                        {snb ? (
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">SNB Policy Rate</p>
                                    <p className="text-2xl font-mono font-black text-white">
                                        {snb.payload.series.SNB_POLICY_RATE?.value}%
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white/2 p-2 rounded text-center">
                                        <p className="text-[9px] text-slate-600 uppercase font-bold">USD/CHF</p>
                                        <p className="text-xs font-mono text-white">{snb.payload.series.USD_CHF?.value}</p>
                                    </div>
                                    <div className="bg-white/2 p-2 rounded text-center">
                                        <p className="text-[9px] text-slate-600 uppercase font-bold">EUR/CHF</p>
                                        <p className="text-xs font-mono text-white">{snb.payload.series.EUR_CHF?.value}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-600 italic">SNB data stream pending...</p>
                        )}
                    </div>

                </div>

                {/* SWISS OPEN DATA WATCHLIST */}
                <div className="mt-12 md:mt-16">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-primary">
                            Gov.Data Watchlist (opendata.swiss)
                        </h3>
                        <div className="h-px w-full bg-slate-800" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {openData?.payload.results.map((item: any, idx: number) => (
                            <a
                                key={idx}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-slate-900/30 border border-white/5 p-4 rounded-xl flex flex-col hover:bg-slate-900/50 transition-all"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">{item.organization}</span>
                                    <span className="text-[9px] font-mono text-slate-600">{new Date(item.modified).toLocaleDateString()}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.title}</h4>
                            </a>
                        ))}
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
