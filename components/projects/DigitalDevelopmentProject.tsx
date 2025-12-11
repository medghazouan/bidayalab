"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Zap, BarChart3, Smartphone } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function DigitalDevelopmentProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-[#beff01] selection:text-black relative overflow-x-hidden">

            {/* Ambient Background */}
            {/* Ambient Background - Removed to match Creative Studio */}

            {/* Navigation */}
            <div className="absolute top-0 left-0 right-0 z-30 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mt-24">
                <Link href="/works" className="group flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span>Back to Works</span>
                </Link>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-[#beff01] uppercase tracking-wider">
                    {project.category.replace('-', ' ')}
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-16 md:pt-64">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <div className="relative z-10 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#beff01]/10 border border-[#beff01]/20 text-[#beff01] text-xs font-medium rounded-full mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#beff01] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#beff01]"></span>
                                </span>
                                Case Study: {project.title}
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                                Code That Actually Prints Money.
                            </h1>

                            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-6">
                                Most agencies build pretty websites that do nothing. We build digital assets engineered to convert visitors into paying customers. Fast, secure, and built for growth.
                            </p>

                            <p className="text-sm text-zinc-500 border-l-2 border-[#beff01] pl-4">
                                Project Scope: {project.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" className="px-8 py-4 bg-[#beff01] text-black font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2 group">
                                    Visit Live Site
                                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-3 gap-8 pt-12"
                        >
                            <div>
                                <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Client</div>
                                <div className="text-white font-medium">{project.client}</div>
                            </div>
                            <div>
                                <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Timeline</div>
                                <div className="text-white font-medium">{project.duration || "Ongoing"}</div>
                            </div>
                            <div>
                                <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Year</div>
                                <div className="text-white font-medium">{project.year}</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Product Showcase */}
                    <div className="relative h-[500px] lg:h-[700px] w-full">
                        <motion.div style={{ y: heroY, opacity }} className="relative w-full h-full">
                            {/* Main Device Mockup */}
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-[#beff01]/10">
                                {/* Browser Chrome */}
                                <div className="h-10 bg-zinc-900/50 backdrop-blur border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                    </div>
                                    <div className="mx-auto px-4 py-1 bg-black/20 rounded-md text-[10px] text-zinc-600 font-medium w-64 text-center">
                                        {project.liveUrl ? new URL(project.liveUrl).hostname : 'localhost:3000'}
                                    </div>
                                </div>
                                {/* Screen Content */}
                                <div className="relative h-[calc(100%-40px)] w-full">
                                    <Image
                                        src={getAssetUrl(project.image)}
                                        alt="Product Interface"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Floating UI Card 1 */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-8 bottom-24 p-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl max-w-[200px]"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-[#beff01]/20 rounded-lg text-[#beff01]">
                                        <Zap size={16} />
                                    </div>
                                    <div className="text-xs font-medium text-white">Performance</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#beff01] w-[98%]" />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-zinc-500">
                                        <span>Score</span>
                                        <span className="text-white">98/100</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating UI Card 2 */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -right-8 top-32 p-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#beff01]/20 rounded-lg text-[#beff01]">
                                        <Smartphone size={16} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-white">Responsive</div>
                                        <div className="text-[10px] text-zinc-500">Mobile Ready</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem & Solution */}
            {/* Problem & Solution */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 text-[#beff01] font-medium text-sm uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
                            The Challenge
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Identifying the core friction points in the user experience.
                        </h2>
                        <div className="prose prose-invert prose-lg text-zinc-400">
                            <p>{project.challenge}</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 text-white font-medium text-sm uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            The Solution
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Engineering a seamless, scalable, and intuitive platform.
                        </h2>
                        <div className="prose prose-invert prose-lg text-zinc-400">
                            <p>{project.solution}</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features - Creative Grid */}
            {project.features && project.features.length > 0 && (
                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                            <div>
                                <div className="inline-flex items-center gap-2 text-[#beff01] font-medium text-sm uppercase tracking-wider mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
                                    System Capabilities
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                    ENGINEERED FOR <br /> IMPACT
                                </h2>
                            </div>
                            <p className="text-zinc-400 max-w-md text-left">
                                A breakdown of the core modules and features that drive the platform&apos;s success.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.features.map((feature, i) => (
                                <div key={i} className="group relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-3xl hover:from-[#beff01]/50 transition-colors duration-500">
                                    <div className="relative h-full bg-[#050505] rounded-[22px] p-8 overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <div className="text-6xl font-black text-white/20">0{i + 1}</div>
                                        </div>
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#beff01] mb-6 group-hover:scale-110 transition-transform duration-500">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#beff01] transition-colors">
                                                {feature}
                                            </h3>
                                            <div className="w-12 h-1 bg-white/10 rounded-full group-hover:w-full group-hover:bg-[#beff01] transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}



            {/* Metrics Dashboard */}
            {
                project.results && project.results.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                            <div className="flex items-center justify-between mb-16">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Impact & Results</h2>
                                    <p className="text-zinc-400">Measurable outcomes delivered.</p>
                                </div>
                                <BarChart3 className="text-zinc-700 w-12 h-12 opacity-50" />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {project.results.map((res, i) => (
                                    <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#beff01]/30 transition-colors group">
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-[#beff01] transition-colors">
                                            {res.value}
                                        </div>
                                        <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">{res.metric}</div>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{res.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Gallery Grid - Creative Masonry */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 text-[#beff01] font-medium text-sm uppercase tracking-wider mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
                                Visual Showcase
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                INTERFACE <br /> GALLERY
                            </h2>
                        </div>
                        <p className="text-zinc-400 max-w-md text-left">
                            A curated selection of high-fidelity screens demonstrating the user experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {/* Column 1 */}
                        <div className="space-y-8 md:space-y-16">
                            {project.images.slice(1).filter((_, i) => i % 2 === 0).map((img, i) => (
                                <div key={`col1-${i}`} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                                    {/* Browser Header */}
                                    <div className="h-12 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                                            <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-[#ffbd2e] transition-colors duration-300" />
                                            <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-[#27c93f] transition-colors duration-300" />
                                        </div>
                                        <div className="ml-4 px-3 py-1 bg-black/20 rounded text-[10px] font-mono text-zinc-600 w-full max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.title} / View
                                        </div>
                                    </div>
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image
                                            src={getAssetUrl(img)}
                                            alt={`Gallery Image ${i}`}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 2 - Staggered */}
                        <div className="space-y-8 md:space-y-16 md:pt-32">
                            {project.images.slice(1).filter((_, i) => i % 2 === 1).map((img, i) => (
                                <div key={`col2-${i}`} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                                    {/* Browser Header */}
                                    <div className="h-12 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                                            <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-[#ffbd2e] transition-colors duration-300" />
                                            <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-[#27c93f] transition-colors duration-300" />
                                        </div>
                                        <div className="ml-4 px-3 py-1 bg-black/20 rounded text-[10px] font-mono text-zinc-600 w-full max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.title} / View
                                        </div>
                                    </div>
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image
                                            src={getAssetUrl(img)}
                                            alt={`Gallery Image ${i}`}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA - Minimalist Typography */}
            <section className="py-20 md:py-32 bg-[#beff01] text-black text-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-[0.8]">
                        Ready to<br />Build?
                    </h2>
                    <Link href="/contact" className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        Start Project <ArrowUpRight size={24} />
                    </Link>
                </div>
            </section>

        </div >
    );
}
