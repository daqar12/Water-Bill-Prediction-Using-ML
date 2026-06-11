"use client";

import { useState, useEffect, useRef } from "react";
import {
    Brain, Droplets, TrendingUp, Upload, Calendar,
    SlidersHorizontal, FileText, Download, Save,
    Share2, Filter, Clock, Target, Award,
    ChevronDown, Loader2, Sparkles, AlertCircle,
    CheckCircle2, AlertTriangle, BarChart3, X
} from "lucide-react";
import {
    RadialBarChart, RadialBar, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    LineChart, Line, Area, AreaChart
} from "recharts";

// ── Types ────────────────────────────────────────────────
interface PredictionResult {
    percentage: number;
    level: "high" | "medium" | "low";
    success: number;
    risk: number;
    confidence: number;
    totalPredictions: number;
    accuracy: number;
    lastUpdated: string;
}

interface HistoryRow {
    id: string;
    customer: string;
    branch: string;
    predicted: number;
    actual: number | null;
    confidence: number;
    date: string;
    status: "matched" | "pending" | "deviation";
}

// ── Mock data ─────────────────────────────────────────────
const trendData = [
    { month: "Jun", predicted: 18, actual: 17 },
    { month: "Jul", predicted: 22, actual: 21 },
    { month: "Aug", predicted: 25, actual: 26 },
    { month: "Sep", predicted: 19, actual: 20 },
    { month: "Oct", predicted: 15, actual: 14 },
    { month: "Nov", predicted: 14, actual: null },
];

const barData = [
    { zone: "Dayniile",   value: 87 },
    { zone: "Hodan",      value: 73 },
    { zone: "Wadajir",    value: 91 },
    { zone: "Hawlwadaag", value: 65 },
];

const historyData: HistoryRow[] = [
    { id: "PRD-001", customer: "Mohamed Ahmed",  branch: "Dayniile",   predicted: 19, actual: 20, confidence: 94, date: "2024-11-30", status: "matched"   },
    { id: "PRD-002", customer: "Amina Hassan",   branch: "Hodan",      predicted: 13, actual: 11, confidence: 82, date: "2024-11-29", status: "deviation"  },
    { id: "PRD-003", customer: "Ali Yusuf",      branch: "Wadajir",    predicted: 8,  actual: 2,  confidence: 71, date: "2024-11-29", status: "deviation"  },
    { id: "PRD-004", customer: "Faadumo Omar",   branch: "Hawlwadaag", predicted: 6,  actual: 6,  confidence: 97, date: "2024-11-28", status: "matched"   },
    { id: "PRD-005", customer: "Abdullahi Muse", branch: "Dayniile",   predicted: 3,  actual: null, confidence: 88, date: "2024-11-28", status: "pending"  },
];

const categories   = ["Water Consumption", "Bill Amount", "Usage Pattern", "Seasonal Demand"];
const predTypes    = ["Monthly Forecast", "Quarterly Forecast", "Anomaly Detection", "Peak Usage"];
const branchList   = ["Dayniile", "Hodan", "Wadajir", "Hawlwadaag"];

const statusCfg = {
    matched:   { label: "Matched",   class: "bg-green-50 text-green-600 dark:bg-green-900/20"  },
    pending:   { label: "Pending",   class: "bg-amber-50  text-amber-600  dark:bg-amber-900/20" },
    deviation: { label: "Deviation", class: "bg-red-50    text-red-600    dark:bg-red-900/20"   },
};

const levelCfg = {
    high:   { label: "High Probability",   icon: <CheckCircle2  className="w-5 h-5" />, gradient: "from-green-400  to-teal-500",   ring: "#10b981", text: "text-green-600"  },
    medium: { label: "Medium Probability", icon: <AlertTriangle className="w-5 h-5" />, gradient: "from-amber-400  to-orange-500", ring: "#f59e0b", text: "text-amber-600"  },
    low:    { label: "Low Probability",    icon: <AlertCircle   className="w-5 h-5" />, gradient: "from-red-400    to-pink-500",   ring: "#ef4444", text: "text-red-600"    },
};

// ── Animated counter ──────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const t = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(t); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(t);
    }, [target, duration]);
    return val;
}

// ── Circular progress ─────────────────────────────────────
function CircularProgress({ value, color }: { value: number; color: string }) {
    const r = 70, circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    const count = useCountUp(value);
    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="12"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }} />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-800 dark:text-slate-100">{count}%</span>
                <span className="text-xs text-slate-400 mt-0.5">Probability</span>
            </div>
        </div>
    );
}

// ── Animated progress bar ─────────────────────────────────
function AnimBar({ label, value, color }: { label: string; value: number; color: string }) {
    const [width, setWidth] = useState(0);
    const count = useCountUp(value);
    useEffect(() => { const t = setTimeout(() => setWidth(value), 100); return () => clearTimeout(t); }, [value]);
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                <span>{label}</span><span>{count}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
                    style={{ width: `${width}%` }} />
            </div>
        </div>
    );
}

// ── Custom dropdown ───────────────────────────────────────
function Select({ label, options, value, onChange }: {
    label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur text-sm text-slate-700 dark:text-slate-200 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30">
                <span className={value ? "text-slate-800 dark:text-slate-100" : "text-slate-400"}>{value || label}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                    {options.map((o) => (
                        <button key={o} onClick={() => { onChange(o); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${value === o ? "text-primary font-medium bg-primary/5" : "text-slate-700 dark:text-slate-300"}`}>
                            {o}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ══════════════════════════════════════════════════════════
export default function MLPredictionsPage() {
    const [category,   setCategory]   = useState("");
    const [predType,   setPredType]   = useState("");
    const [branch,     setBranch]     = useState("");
    const [userInput,  setUserInput]  = useState("");
    const [date,       setDate]       = useState("");
    const [slider,     setSlider]     = useState(50);
    const [notes,      setNotes]      = useState("");
    const [fileName,   setFileName]   = useState("");
    const [loading,    setLoading]    = useState(false);
    const [result,     setResult]     = useState<PredictionResult | null>(null);
    const [errors,     setErrors]     = useState<Record<string, string>>({});
    const [filterStat, setFilterStat] = useState<"all" | "matched" | "pending" | "deviation">("all");
    const fileRef = useRef<HTMLInputElement>(null);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!category)  e.category  = "Please select a category";
        if (!predType)  e.predType  = "Please select prediction type";
        if (!userInput) e.userInput = "Please enter a value";
        if (!date)      e.date      = "Please select a date";
        if (!branch)    e.branch    = "Please select a branch";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePredict = async () => {
        if (!validate()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 2200));
        const pct = Math.floor(60 + Math.random() * 35);
        setResult({
            percentage:       pct,
            level:            pct >= 80 ? "high" : pct >= 60 ? "medium" : "low",
            success:          pct,
            risk:             100 - pct,
            confidence:       Math.floor(78 + Math.random() * 18),
            totalPredictions: 11048,
            accuracy:         94.3,
            lastUpdated:      new Date().toLocaleString(),
        });
        setLoading(false);
    };

    const filtered = historyData.filter((h) => filterStat === "all" || h.status === filterStat);

    return (
        <div className="space-y-6 pb-8">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        
                        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">ML Predictions</h2>
                    </div>
                    <p className="text-slate-500 text-sm mt-1 ml-1">Water bill forecasting powered by machine learning.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 hover:border-primary/40 transition-all">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary to-teal-500 text-white text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                        <Save className="w-4 h-4" /> Save Results
                    </button>
                </div>
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

                {/* ── LEFT: Form ── */}
                <div className="xl:col-span-2">
                    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-6 space-y-5">

                        {/* Form title */}
                        <div className="flex items-center gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-1.5 rounded-lg bg-primary/10">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100">Prediction Form</h3>
                                <p className="text-xs text-slate-400">Fill all fields to generate ML forecast</p>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</label>
                            <Select label="Select Category" options={categories} value={category} onChange={setCategory} />
                            {errors.category && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.category}</p>}
                        </div>

                        {/* Prediction type */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Prediction Type</label>
                            <Select label="Select Prediction Type" options={predTypes} value={predType} onChange={setPredType} />
                            {errors.predType && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.predType}</p>}
                        </div>

                        {/* Branch */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Branch</label>
                            <Select label="Select Branch" options={branchList} value={branch} onChange={setBranch} />
                            {errors.branch && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.branch}</p>}
                        </div>

                        {/* User Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                <span className="flex items-center gap-1"><Droplets className="w-3 h-3" />Consumption Value (m³)</span>
                            </label>
                            <input
                                type="number"
                                value={userInput}
                                onChange={(e) => { setUserInput(e.target.value); setErrors((p) => ({ ...p, userInput: "" })); }}
                                placeholder="e.g. 15"
                                className={`w-full px-4 py-3 rounded-2xl border ${errors.userInput ? "border-red-400" : "border-slate-200 dark:border-slate-700"} bg-white/60 dark:bg-slate-800/60 backdrop-blur text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                            />
                            {errors.userInput && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.userInput}</p>}
                        </div>

                        {/* Date */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Prediction Date</span>
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => { setDate(e.target.value); setErrors((p) => ({ ...p, date: "" })); }}
                                className={`w-full px-4 py-3 rounded-2xl border ${errors.date ? "border-red-400" : "border-slate-200 dark:border-slate-700"} bg-white/60 dark:bg-slate-800/60 backdrop-blur text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                            />
                            {errors.date && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.date}</p>}
                        </div>

                        {/* Slider */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                                <SlidersHorizontal className="w-3 h-3" />Confidence Threshold — <span className="text-primary">{slider}%</span>
                            </label>
                            <input type="range" min={0} max={100} value={slider}
                                onChange={(e) => setSlider(Number(e.target.value))}
                                className="w-full h-2 accent-primary rounded-full cursor-pointer" />
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>0%</span><span>50%</span><span>100%</span>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes (Optional)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any relevant notes..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                            />
                        </div>

                        {/* File upload */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upload File (Optional)</label>
                            <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
                                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
                            <button onClick={() => fileRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-slate-500 group">
                                {fileName
                                    ? <><FileText className="w-4 h-4 text-primary" /><span className="text-primary font-medium truncate max-w-[180px]">{fileName}</span><X className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" onClick={(ev) => { ev.stopPropagation(); setFileName(""); }} /></>
                                    : <><Upload className="w-4 h-4 group-hover:text-primary transition-colors" />Upload CSV / Excel</>
                                }
                            </button>
                        </div>

                        {/* CTA */}
                        <button onClick={handlePredict} disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary to-teal-500 text-white font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200">
                            {loading
                                ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing with ML Model...</>
                                : <><Brain  className="w-4 h-4" />Generate Prediction</>
                            }
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Results ── */}
                <div className="xl:col-span-3 space-y-5">

                    {/* Empty state */}
                    {!result && !loading && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur text-center p-12 space-y-4">
                            <div className="p-5 rounded-full bg-gradient-to-br from-primary/10 to-teal-100 dark:from-primary/20 dark:to-teal-900/30">
                                <Brain className="w-12 h-12 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">No Prediction Yet</h3>
                                <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">Fill in the prediction form and click <strong>Generate Prediction</strong> to see your ML results here.</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                Powered by Water Bill ML Model v2.4
                            </div>
                        </div>
                    )}

                    {/* Loading skeleton */}
                    {loading && (
                        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 space-y-6 animate-pulse">
                            <div className="flex justify-center"><div className="w-48 h-48 rounded-full bg-slate-100 dark:bg-slate-800" /></div>
                            {[1,2,3].map(i => <div key={i} className="h-8 rounded-2xl bg-slate-100 dark:bg-slate-800" />)}
                        </div>
                    )}

                    {/* Result */}
                    {result && !loading && (() => {
                        const lvl = levelCfg[result.level];
                        return (
                            <div className="space-y-5">

                                {/* Circular + status */}
                                <div className="rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl p-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-8">

                                        {/* Circle */}
                                        <div className="shrink-0">
                                            <CircularProgress value={result.percentage} color={result.level === "high" ? "#10b981" : result.level === "medium" ? "#f59e0b" : "#ef4444"} />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${lvl.gradient} text-white font-semibold text-sm shadow-lg`}>
                                                {lvl.icon}{lvl.label}
                                            </div>
                                            <div className="space-y-3">
                                                <AnimBar label="Success Rate"    value={result.success}    color="bg-gradient-to-r from-teal-400  to-teal-600"  />
                                                <AnimBar label="Risk Level"      value={result.risk}       color="bg-gradient-to-r from-red-400   to-red-600"   />
                                                <AnimBar label="Confidence Score" value={result.confidence} color="bg-gradient-to-r from-blue-400  to-blue-600"  />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Analytics cards */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { label: "Total Predictions", value: result.totalPredictions.toLocaleString(), icon: <Target  className="w-4 h-4 text-blue-500"   />, bg: "bg-blue-50   dark:bg-blue-900/20"   },
                                        { label: "Accuracy",          value: `${result.accuracy}%`,                   icon: <Award   className="w-4 h-4 text-green-500"  />, bg: "bg-green-50  dark:bg-green-900/20"  },
                                        { label: "Confidence",        value: `${result.confidence}%`,                 icon: <TrendingUp className="w-4 h-4 text-teal-500" />, bg: "bg-teal-50   dark:bg-teal-900/20"   },
                                        { label: "Last Updated",      value: "Just now",                              icon: <Clock   className="w-4 h-4 text-amber-500"  />, bg: "bg-amber-50  dark:bg-amber-900/20"  },
                                    ].map((c, i) => (
                                        <div key={i} className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur p-4 space-y-2">
                                            <div className={`p-2 rounded-xl w-fit ${c.bg}`}>{c.icon}</div>
                                            <p className="text-xs text-slate-500">{c.label}</p>
                                            <p className="text-base font-bold text-slate-800 dark:text-slate-100">{c.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Charts */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-5">
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Prediction Trend</p>
                                        <div className="h-[160px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={trendData}>
                                                    <defs>
                                                        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%"  stopColor="#0F766E" stopOpacity={0.2} />
                                                            <stop offset="95%" stopColor="#0F766E" stopOpacity={0}   />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '11px' }} />
                                                    <Area  type="monotone" dataKey="actual"    stroke="#0F766E" strokeWidth={2} fill="url(#tg)" />
                                                    <Line  type="monotone" dataKey="predicted" stroke="#F59E0B" strokeWidth={2} strokeDasharray="4 3" dot={false} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-5">
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Zone Accuracy (%)</p>
                                        <div className="h-[160px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={barData} barSize={22}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '11px' }} />
                                                    <Bar dataKey="value" radius={[8, 8, 0, 0]}
                                                        fill="url(#barGrad)" />
                                                    <defs>
                                                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%"   stopColor="#0F766E" />
                                                            <stop offset="100%" stopColor="#14b8a6" />
                                                        </linearGradient>
                                                    </defs>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {[
                                        { label: "Export PDF",   icon: <Download className="w-4 h-4" />, style: "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200" },
                                        { label: "Export Excel", icon: <BarChart3 className="w-4 h-4" />, style: "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200" },
                                        { label: "Save",         icon: <Save     className="w-4 h-4" />, style: "bg-primary to-teal-500 text-white shadow-lg shadow-primary/25" },
                                        { label: "Share",        icon: <Share2   className="w-4 h-4" />, style: "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200" },
                                    ].map((btn, i) => (
                                        <button key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium hover:-translate-y-0.5 transition-all ${btn.style}`}>
                                            {btn.icon}{btn.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>

            {/* ── History Table ── */}
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Prediction History</h3>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">{historyData.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            {(["all", "matched", "pending", "deviation"] as const).map((s) => (
                                <button key={s} onClick={() => setFilterStat(s)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filterStat === s ? "bg-white dark:bg-slate-700 text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Branch</th>
                                <th className="px-6 py-3 text-right">Predicted (m³)</th>
                                <th className="px-6 py-3 text-right">Actual (m³)</th>
                                <th className="px-6 py-3 text-right">Confidence</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((h) => (
                                <tr key={h.id} className="border-b last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-3 font-mono text-xs text-primary font-semibold">{h.id}</td>
                                    <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{h.customer}</td>
                                    <td className="px-6 py-3 text-slate-500 text-xs">{h.branch}</td>
                                    <td className="px-6 py-3 text-right font-bold text-teal-600">{h.predicted}</td>
                                    <td className="px-6 py-3 text-right text-slate-600 dark:text-slate-300">{h.actual ?? <span className="text-slate-300">—</span>}</td>
                                    <td className="px-6 py-3 text-right">
                                        <span className={`font-semibold ${h.confidence >= 90 ? "text-green-600" : h.confidence >= 75 ? "text-amber-600" : "text-red-500"}`}>{h.confidence}%</span>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusCfg[h.status].class}`}>
                                            {statusCfg[h.status].label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-400 text-xs">{h.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}