"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bot, Zap, Network, Sparkles, RefreshCcw, Cpu, Workflow, Power, Terminal, ShieldCheck, Activity } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function AIAutomationProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#beff01]/30 overflow-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#beff01]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>

            {/* Sub-Navbar - Absolute & Transparent to overlay Hero */}
            <div className="absolute top-[100px] left-0 right-0 z-30 w-full bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center py-4 pointer-events-auto">
                    <Link href="/works" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                        <div className="w-8 h-8 rounded bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-[#beff01]/50 transition-colors">
                            <ArrowLeft size={14} />
                        </div>
                        <span className="hidden md:block shadow-black drop-shadow-md font-mono">Back</span>
                    </Link>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#beff01]/5 border border-[#beff01]/20 text-[#beff01] text-xs font-mono animate-pulse shadow-black drop-shadow-md">
                        <Bot size={14} />
                        <span>AI_PROTOCOL_ACTIVE</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 pt-40 pb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                        <motion.div
                            style={{ opacity: heroOpacity, scale: heroScale }}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6 text-[#beff01] font-mono text-xs tracking-widest border border-[#beff01]/20 px-3 py-1 rounded-full bg-[#beff01]/5">
                                <span className="w-1.5 h-1.5 bg-[#beff01] rounded-full animate-pulse" />
                                SYSTEM_ONLINE
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight font-mono">
                                {project.title}
                            </h1>
                            <p className="text-xl text-zinc-300 leading-relaxed max-w-xl mb-12 font-light">
                                {project.description}
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold uppercase text-zinc-500 mb-3 font-mono tracking-wider">Neural Models</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.aiModels?.map((model, i) => (
                                            <div key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2 text-xs font-mono text-[#beff01]">
                                                <Cpu size={12} />
                                                {model}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Process Visualization - Modern Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative rounded-3xl bg-white/5 border border-white/10 p-1 overflow-hidden backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/5 to-transparent opacity-50" />

                            <div className="relative bg-black/40 rounded-[22px] p-8 space-y-8">
                                {/* Header */}
                                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                                    <div className="flex items-center gap-3">
                                        <Activity className="text-[#beff01]" size={20} />
                                        <span className="text-sm font-mono text-zinc-300">LIVE_PROCESS_VIEW</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                        <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
                                    </div>
                                </div>

                                {/* Flow */}
                                <div className="space-y-6 relative">
                                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-zinc-800 via-[#beff01]/50 to-zinc-800" />

                                    <div className="relative flex items-center gap-6 pl-12">
                                        <div className="absolute left-[21px] w-2 h-2 rounded-full bg-zinc-600 border border-black" />
                                        <div className="flex-1 p-4 rounded-lg bg-white/5 border border-white/5">
                                            <div className="text-xs text-zinc-500 font-mono mb-1">INPUT_STREAM</div>
                                            <div className="text-sm text-white">Unstructured Data Ingestion</div>
                                        </div>
                                    </div>

                                    <div className="relative flex items-center gap-6 pl-12">
                                        <div className="absolute left-[19px] w-3 h-3 rounded-full bg-[#beff01] shadow-[0_0_10px_#beff01]" />
                                        <div className="flex-1 p-5 rounded-lg bg-[#beff01]/10 border border-[#beff01]/20">
                                            <div className="text-xs text-[#beff01] font-mono mb-1">NEURAL_PROCESSING</div>
                                            <div className="text-base font-bold text-white">{project.automationType || "Cognitive Analysis"}</div>
                                        </div>
                                    </div>

                                    <div className="relative flex items-center gap-6 pl-12">
                                        <div className="absolute left-[21px] w-2 h-2 rounded-full bg-zinc-600 border border-black" />
                                        <div className="flex-1 p-4 rounded-lg bg-white/5 border border-white/5">
                                            <div className="text-xs text-zinc-500 font-mono mb-1">ACTION_LAYER</div>
                                            <div className="text-sm text-white">Autonomous Execution</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Results Grid - Data Driven */}
                    {project.results && project.results.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                            {project.results.map((res, i) => (
                                <div key={i} className="relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-500">
                                    <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <Terminal size={16} className="text-[#beff01]" />
                                    </div>
                                    <div className="text-zinc-500 text-xs font-bold font-mono uppercase mb-4 tracking-wider">{res.metric}</div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <div className="text-4xl font-black text-white tracking-tighter group-hover:text-[#beff01] transition-colors">
                                            {res.value}
                                        </div>
                                        {res.change && (
                                            <div className="text-xs font-bold text-[#beff01] bg-[#beff01]/10 px-2 py-0.5 rounded-full">
                                                {res.change}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                                        {res.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Workflow & Integrations Split */}
                    <div className="grid lg:grid-cols-12 gap-12 mb-32">
                        {/* Workflow Description */}
                        <div className="lg:col-span-7">
                            <div className="h-full p-8 md:p-12 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-[#beff01]/10 rounded-lg">
                                        <Workflow className="text-[#beff01]" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-mono">Workflow Architecture</h3>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-lg text-zinc-300 leading-relaxed font-light">
                                        {project.workflowDescription || project.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Integrations Matrix */}
                        <div className="lg:col-span-5">
                            <div className="h-full p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Network className="text-blue-400" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-mono">Integrations</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {project.integrations?.map((integration, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#beff01]/30 transition-colors group">
                                            <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-[#beff01] transition-colors" />
                                            <span className="text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">
                                                {integration}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Gallery - Preserved as requested */}
                    <div className="space-y-16">
                        {project.images.map((img, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                key={i}
                                className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60" />
                                <Image
                                    src={img}
                                    alt={`System Interface ${i}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-8 left-8 z-20">
                                    <div className="text-xs font-mono text-[#beff01] mb-2">FIGURE_0{i + 1}</div>
                                    <div className="text-xl font-bold">System Interface Visualization</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Unique CTA: AI Protocol Style */}
            <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#beff01]/5 rounded-full blur-[100px] animate-pulse" />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 mb-8 text-[#beff01] font-mono text-sm">
                        <span className="w-2 h-2 bg-[#beff01] rounded-full animate-pulse" />
                        AWAITING_INPUT
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-mono">
                        Automate the <span className="text-[#beff01]">Impossible.</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Deploy autonomous agents that work 24/7. Scale your operations without scaling your headcount.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/contact" className="group relative px-10 py-5 bg-[#beff01] text-black font-bold text-lg rounded-xl overflow-hidden transition-transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-3 font-mono">
                                <Power size={20} /> ACTIVATE_PROTOCOL
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}