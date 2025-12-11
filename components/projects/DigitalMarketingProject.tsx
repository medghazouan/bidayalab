"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, TrendingUp, Target, ArrowUpRight, DollarSign, Activity } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function DigitalMarketingProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });




    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#beff01] selection:text-black overflow-hidden relative">

            {/* Dynamic Background - Matched to Creative Studio */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-[#beff01]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Navigation - Matched to Creative Studio */}
            <div className="absolute top-0 left-0 right-0 z-30 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mt-24">
                <Link href="/works" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#beff01] rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">Live Campaign</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
                <div className="max-w-[1800px] mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left: Content */}
                    <div className="lg:col-span-7 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.platforms?.map((p, i) => (
                                    <span key={i} className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                        {p}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-4 text-[#beff01] font-mono text-sm tracking-widest uppercase">
                                Case Study: {project.title}
                            </div>

                            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-500">
                                    We Don&apos;t Buy Clicks. We Buy Customers.
                                </span>
                            </h1>

                            <div className="flex items-start gap-6 max-w-2xl border-t border-white/20 pt-8">
                                <div className="p-3 bg-[#beff01] rounded-full text-black">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Our Philosophy</h3>
                                    <p className="text-xl text-zinc-400 font-light leading-relaxed mb-4">
                                        Vanity metrics like &apos;likes&apos; don&apos;t pay the bills. We focus on ROAS, CAC, and LTV. If it doesn&apos;t make dollars, it doesn&apos;t make sense.
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        <span className="text-white font-bold">Project Goal:</span> {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Cover Image & Revenue */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative rounded-[2rem] overflow-hidden group"
                        >
                            {/* Cover Image */}
                            {project.image && (
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={getAssetUrl(project.image)}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                </div>
                            )}

                            {/* Revenue & Budget Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <div className="grid grid-cols-2 gap-8 items-end">
                                    <div>
                                        <div className="text-[#beff01] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <DollarSign size={14} /> Revenue
                                        </div>
                                        <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2">
                                            {project.revenue || project.results?.[0]?.value || "N/A"}
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                                            <span className="px-2 py-1 bg-white/10 rounded">ROI: {project.results?.find(r => r.metric === 'ROAS')?.value || 'High'}</span>
                                        </div>
                                    </div>
                                    <div className="border-l border-white/10 pl-8">
                                        <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Activity size={14} /> Budget
                                        </div>
                                        <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">
                                            {project.budget || "N/A"}
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                                            <span className="px-2 py-1 bg-white/10 rounded">CPA: {project.results?.find(r => r.metric === 'Cost Per Acquisition')?.value || 'Optimized'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategy & Stats Grid */}
            <section className="py-24 bg-[#050505] border-y border-white/5">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Strategy Column */}
                        <div className="lg:col-span-1 space-y-12">
                            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                                <div className="w-12 h-12 bg-[#beff01]/10 rounded-xl flex items-center justify-center text-[#beff01] mb-6">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Target Strategy</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {project.strategy}
                                </p>
                            </div>
                        </div>

                        {/* Audience Only */}
                        <div className="lg:col-span-2">
                            <div className="h-full p-8 bg-zinc-900/30 rounded-2xl border border-white/5 flex flex-col justify-center">
                                <div className="text-zinc-500 text-sm font-bold uppercase mb-4 tracking-widest">Target Audience</div>
                                <div className="text-3xl md:text-4xl font-bold text-white leading-tight">{project.targetAudience || "Global Market"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Creative Showcase (Using Rich Ad Creatives) */}
            {project.adCreatives && project.adCreatives.length > 0 && (
                <section className="py-32 px-6 md:px-12 border-t border-white/5">
                    <div className="max-w-[1800px] mx-auto">
                        <div className="flex items-end justify-between mb-16">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter">
                                    Creative <span className="text-[#beff01]">Matrix</span>
                                </h2>
                                <p className="text-xl text-zinc-400 max-w-2xl">
                                    High-performance assets optimized for maximum conversion.
                                </p>
                            </div>
                            <div className="hidden md:block text-right">
                                <div className="text-3xl font-black text-[#beff01]">{project.adCreatives.length}</div>
                                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Variations Active</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {project.adCreatives.map((creative, i) => (
                                <div key={i} className="group relative bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#beff01] transition-colors">
                                    <div className="aspect-[4/5] relative bg-zinc-900">
                                        {/* Placeholder for creative preview if no image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-9xl opacity-20 group-hover:opacity-10 transition-opacity">
                                            {i + 1}
                                        </div>
                                        {/* Use creative.image if available, fallback to project.images[i] for backward compatibility */}
                                        {(creative.image || (project.images && project.images[i])) && (
                                            <Image
                                                src={getAssetUrl(creative.image || project.images?.[i] || '')}
                                                alt={creative.type}
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="px-3 py-1 bg-[#beff01] text-black text-xs font-bold uppercase rounded">
                                                    {creative.platform}
                                                </span>
                                                <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase rounded backdrop-blur-sm">
                                                    {creative.type}
                                                </span>
                                            </div>
                                            <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-[#beff01] pl-4">
                                                {creative.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-40 bg-[#beff01] text-black text-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
                        WANT TO BECOME THE BENCHMARK IN YOUR MARKET?
                    </h2>
                    <Link href="/contact#contact-form" className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        SEND A MESSAGE AND MAKE IT HAPPEN <ArrowUpRight />
                    </Link>
                </div>
            </section>

        </div>
    );
}