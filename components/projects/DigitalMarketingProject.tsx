"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, TrendingUp, Target, Check, ArrowUpRight, BarChart3, Users, Megaphone, Activity, Rocket, Layers, MousePointerClick, DollarSign } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function DigitalMarketingProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#beff01]/30 overflow-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#beff01]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>

            {/* Sub-Navbar - Absolute & Transparent to overlay Hero */}
            <div className="absolute top-[100px] left-0 right-0 z-30 w-full bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center py-4 pointer-events-auto">
                    <Link href="/works" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                        <div className="w-8 h-8 rounded bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-[#beff01]/50 transition-colors">
                            <ArrowLeft size={14} />
                        </div>
                        <span className="hidden md:block shadow-black drop-shadow-md">Back</span>
                    </Link>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#beff01]/10 border border-[#beff01]/20 text-[#beff01] text-xs font-bold uppercase tracking-wider animate-pulse shadow-black drop-shadow-md">
                        <Activity size={14} />
                        <span>Live_Metrics</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 pt-40 pb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
                        {/* LEFT: Narrative */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex flex-wrap gap-3 mb-8">
                                {project.platforms?.map((p, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full border border-[#beff01]/30 text-[#beff01] text-[10px] font-black uppercase tracking-wider bg-[#beff01]/5">
                                        {p}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] uppercase tracking-tighter">
                                {project.title}
                                <span className="text-[#beff01]">.</span>
                            </h1>

                            <div className="space-y-12">
                                <div className="border-l-4 border-[#beff01] pl-8 py-2">
                                    <h4 className="text-sm font-bold uppercase text-[#beff01] mb-2 tracking-widest">Objective</h4>
                                    <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">{project.description}</p>
                                </div>

                                <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Target size={100} />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase text-white mb-4 tracking-widest flex items-center gap-2 relative z-10">
                                        <Target size={16} className="text-[#beff01]" /> Target Strategy
                                    </h4>
                                    <p className="text-zinc-400 text-lg leading-relaxed relative z-10">{project.strategy}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: The Massive Numbers Board */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-3xl p-10 mb-8 text-center overflow-hidden group hover:border-[#beff01]/50 transition-colors">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="text-[#beff01] w-12 h-12" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-center gap-3 mb-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                        <TrendingUp size={16} className="text-[#beff01]" /> Primary ROI Metric
                                    </div>
                                    {project.results && project.results[0] && (
                                        <div>
                                            <div className="text-7xl lg:text-[100px] font-black text-white leading-none tracking-tighter mb-4">
                                                {project.results[0].value}
                                            </div>
                                            <div className="inline-block px-4 py-2 rounded-full bg-[#beff01]/10 text-[#beff01] font-bold uppercase tracking-wider">
                                                {project.results[0].metric}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {project.results?.slice(1).map((res, i) => (
                                    <div key={i} className="bg-[#0a0a0a] border border-zinc-900 p-8 rounded-3xl hover:bg-zinc-900/50 transition-colors group">
                                        <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-[#beff01] transition-colors">{res.value}</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-4">{res.metric}</div>
                                        {res.change && (
                                            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#beff01] bg-[#beff01]/10 px-2 py-1 rounded">
                                                <ArrowUpRight size={12} /> {res.change}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Audience & Budget Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        <div className="p-8 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-[#beff01]/30 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-[#beff01]/10 flex items-center justify-center text-[#beff01] mb-6 group-hover:scale-110 transition-transform">
                                <Users size={24} />
                            </div>
                            <h4 className="text-sm font-bold uppercase text-zinc-500 mb-2 tracking-widest">Target Audience</h4>
                            <p className="text-xl font-medium text-white">{project.targetAudience || "Global Market"}</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-[#beff01]/30 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-[#beff01]/10 flex items-center justify-center text-[#beff01] mb-6 group-hover:scale-110 transition-transform">
                                <DollarSign size={24} />
                            </div>
                            <h4 className="text-sm font-bold uppercase text-zinc-500 mb-2 tracking-widest">Budget Scale</h4>
                            <p className="text-xl font-medium text-white">{project.budget || "Enterprise"}</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-[#beff01]/30 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-[#beff01]/10 flex items-center justify-center text-[#beff01] mb-6 group-hover:scale-110 transition-transform">
                                <Layers size={24} />
                            </div>
                            <h4 className="text-sm font-bold uppercase text-zinc-500 mb-2 tracking-widest">Ad Creatives</h4>
                            <p className="text-xl font-medium text-white">{project.adCreatives?.length || 0} Variations Tested</p>
                        </div>
                    </div>

                    {/* CREATIVES GRID */}
                    {project.adCreatives && project.adCreatives.length > 0 && (
                        <div className="mt-32 mb-32">
                            <div className="flex items-end justify-between mb-12 border-b border-zinc-800 pb-6">
                                <h2 className="text-4xl font-bold">Creative Strategy</h2>
                                <div className="text-zinc-500 text-sm font-mono">HIGH_PERFORMANCE_ASSETS</div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {project.adCreatives.map((creative, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-[#beff01]/30 transition-colors group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="px-3 py-1 rounded-full bg-[#beff01]/10 text-[#beff01] text-xs font-bold uppercase">
                                                {creative.platform}
                                            </div>
                                            <div className="text-zinc-600 font-mono text-xs">0{i + 1}</div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4">{creative.type}</h3>
                                        <p className="text-zinc-400 leading-relaxed text-sm">
                                            {creative.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Visual Gallery */}
                    <div className="space-y-16">
                        <div className="flex items-end justify-between mb-12 border-b border-zinc-800 pb-6">
                            <h2 className="text-4xl font-bold">Campaign Visuals</h2>
                            <div className="text-zinc-500 text-sm font-mono">VISUAL_ASSETS</div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {project.images.slice(0, 4).map((img, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="group relative aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#beff01]/50 transition-all"
                                >
                                    <Image
                                        src={img}
                                        alt="Creative"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            <span className="w-2 h-2 bg-[#beff01] rounded-full animate-pulse" />
                                            <span className="text-[#beff01] text-xs font-bold uppercase">High CTR</span>
                                        </div>
                                        <p className="text-sm text-white font-bold">Asset Preview {String.fromCharCode(65 + i)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Unique CTA: Growth Graph Style */}
            <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Simulated Graph Line */}
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 80 40 90 60 50 S 80 20 100 0" stroke="rgba(190, 255, 1, 0.2)" strokeWidth="0.5" fill="none" />
                        <path d="M0 100 L 100 100 L 100 0 L 0 0 Z" fill="url(#grad)" opacity="0.1" />
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#beff01" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#beff01" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#beff01]/10 text-[#beff01] text-sm font-bold mb-8 border border-[#beff01]/20">
                        <Rocket size={16} /> Ready for Hypergrowth?
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        Scale Your <span className="text-[#beff01]">Revenue.</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Stop guessing. Start growing with data-driven strategies that deliver measurable ROI.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/contact" className="group relative px-10 py-5 bg-[#beff01] text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-[#a8e600] hover:scale-105 shadow-[0_0_30px_-10px_rgba(190,255,1,0.3)]">
                            <span className="relative flex items-center gap-3">
                                Launch Campaign <ArrowUpRight size={20} />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}