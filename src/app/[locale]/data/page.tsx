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

    function getFreshness(timestamp: string | undefined) {
        if (!timestamp) return '---';
        const diff = Date.now() - new Date(timestamp).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return new Date(timestamp).toLocaleDateString();
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-950">
            <Header locale={locale} />
            <CategoryTabs locale={locale} />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 md:py-16">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-0.5 w-12 bg-primary rounded-full"></span>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary/80">Real-Time intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                        Terminal <span className="text-primary italic">Ops</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                        Sistema automatizado de vigilancia para mercados globales, política monetaria suiza y conjuntos de datos gubernamentales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* CARD 1: MARKETS */}
                    <div className="bg-slate-900/40 border border-white/[0.03] rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.1)]">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 px-2 py-1 rounded-sm">Markets</span>
                            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter">{getFreshness(market?.created_at)}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Market Pulse</h2>
                        {market ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 group">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-black">Nasdaq (QQQ)</p>
                                            <span className={`text-[10px] font-bold ${market.payload.markets.qqq.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {market.payload.markets.qqq.change >= 0 ? '▲' : '▼'} {market.payload.markets.qqq.change_percent}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-mono font-black text-white">${market.payload.markets.qqq.price.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 group">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-black">S&P 500 (SPY)</p>
                                            <span className={`text-[10px] font-bold ${market.payload.markets.spy.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {market.payload.markets.spy.change >= 0 ? '▲' : '▼'} {market.payload.markets.spy.change_percent}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-mono font-black text-white">${market.payload.markets.spy.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-600 italic">Capturing data...</p>
                        )}
                    </div>

                    {/* CARD 2: MACRO (FRED) */}
                    <div className="bg-slate-900/40 border border-white/[0.03] rounded-3xl p-8 flex flex-col hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(245,158,11,0.1)]">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 border border-amber-500/20 px-2 py-1 rounded-sm">Global Macro</span>
                            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter">{getFreshness(macro?.created_at)}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">US Federal Reserve</h2>
                        {macro ? (
                            <div className="space-y-3">
                                {Object.values(macro.payload.series).map((s: any, idx: number) => (
                                    <div key={idx} className="flex flex-col p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{s.label}</span>
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-xl font-mono font-black text-white">{s.value}{s.unit === '%' ? '%' : ''}</span>
                                            <span className="text-[9px] text-slate-600 font-mono uppercase">{s.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-600 italic">Syncing FRED database...</p>
                        )}
                    </div>

                    {/* CARD 3: SWITZERLAND (SNB) */}
                    <div className="bg-slate-900/40 border border-white/[0.03] rounded-3xl p-8 flex flex-col hover:border-rose-500/30 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(244,63,94,0.1)]">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 border border-rose-500/20 px-2 py-1 rounded-sm">Swiss Policy</span>
                            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter">{getFreshness(snb?.created_at)}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Monetary Ops</h2>
                        {snb ? (
                            <div className="space-y-4">
                                <div className="bg-rose-500/5 p-6 rounded-2xl border border-rose-500/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 transition-opacity group-hover:opacity-40">
                                        <span className="material-symbols-outlined text-4xl text-rose-500">account_balance</span>
                                    </div>
                                    <p className="text-[10px] text-rose-500/80 uppercase font-black tracking-widest mb-2">SNB Policy Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl font-mono font-black text-white">
                                            {snb.payload.policy_rate?.value ?? snb.payload.policy_rate?.last_good_value ?? '0.00'}%
                                        </p>
                                        <span className="text-[10px] text-slate-600 font-mono uppercase">
                                            {snb.payload.policy_rate?.asof || snb.payload.policy_rate?.last_good_asof || 'N/A'}
                                        </span>
                                    </div>
                                    {snb.payload.policy_rate?.status !== 'ok' && (
                                        <div className="mt-4 pt-3 border-t border-rose-500/10 text-[9px] text-amber-500/80 font-mono flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                            Using historical bench (API Unavailable)
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.05] text-center">
                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">USD/CHF</p>
                                        <p className="text-sm font-mono font-black text-white">
                                            {snb.payload.fx?.usd_chf || snb.payload.series?.USD_CHF?.value || '---'}
                                        </p>
                                    </div>
                                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.05] text-center">
                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">EUR/CHF</p>
                                        <p className="text-sm font-mono font-black text-white">
                                            {snb.payload.fx?.eur_chf || snb.payload.series?.EUR_CHF?.value || '---'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-600 italic">Mapping SNB Data Portal...</p>
                        )}
                    </div>

                </div>

                {/* SWISS OPEN DATA WATCHLIST */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <h3 className="whitespace-nowrap text-xs font-black uppercase tracking-[0.3em] text-primary">
                                Gov Engine Watchlist
                            </h3>
                            <div className="h-px w-24 bg-slate-800" />
                        </div>
                        <span className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter">Source: opendata.swiss</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {openData?.payload.results.map((item: any, idx: number) => (
                            <a
                                key={idx}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-slate-900/20 border border-white/[0.03] p-6 rounded-2xl flex flex-col hover:bg-slate-900/40 hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{item.organization}</span>
                                    <span className="text-[9px] font-mono text-slate-600 border border-white/[0.05] px-1.5 py-0.5 rounded uppercase">Modified: {new Date(item.modified).toLocaleDateString()}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors leading-relaxed line-clamp-3 mb-4">{item.title}</h4>
                                <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-primary transition-colors">
                                    Dataset Intelligence <span className="material-symbols-outlined text-sm">north_east</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>

            <Footer locale={locale} />
        </div>
    );
}
