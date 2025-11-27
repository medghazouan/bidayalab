"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Terminal, Cpu, Globe, Braces, ChevronRight } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function DigitalDevelopmentProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-zinc-100 font-mono selection:bg-[#beff01]/30 relative pt-24">

            {/* Sub-Navbar - Aligned with Global Navbar */}
            <div className="w-full bg-[#050505] border-b border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center py-4">
                    <Link href="/works" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#beff01]/50 transition-colors">
                            <ArrowLeft size={14} />
                        </div>
                        <span className="hidden md:block">Back</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" className="px-4 py-2 bg-[#beff01] hover:bg-[#a8e600] text-black text-xs font-bold uppercase tracking-wider transition-all">
                                Live_Build
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero Section - Aligned Layout */}
            <section className="relative min-h-[calc(100vh-160px)] flex flex-col justify-center overflow-hidden">
                {/* Background Code Decorations */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute top-20 left-10 text-xs text-[#beff01]/50 whitespace-pre font-mono">
                        {`import { Future } from '@bidayalab/core';\n\nconst vision = new Future({\n  mode: 'limitless',\n  render: true\n});`}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10 pt-12">

                    {/* Left: Typography & Meta */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Braces className="text-[#beff01]" size={24} />
                                <span className="text-[#beff01] text-sm font-bold tracking-widest">DIGITAL_EXPERIENCE</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                                    {project.title}
                                </span>
                            </h1>

                            <div className="p-6 border-l-2 border-[#beff01]/50 bg-[#beff01]/5 backdrop-blur-sm max-w-2xl mb-12">
                                <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                                    <span className="text-[#beff01] font-bold mr-2">{`//`}</span>
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, i) => (
                                    <div key={i} className="px-3 py-1.5 border border-white/10 bg-white/5 text-xs text-zinc-400 hover:text-white hover:border-[#beff01]/50 transition-colors cursor-default">
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Abstract Visual */}
                    <div className="lg:col-span-5 relative h-[500px] lg:h-[700px]">
                        <motion.div
                            style={{ y: heroY }}
                            className="absolute inset-0 z-10"
                        >
                            <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a] group">
                                {/* Browser Header */}
                                <div className="absolute top-0 left-0 right-0 h-8 bg-[#111] border-b border-white/5 flex items-center px-3 gap-2 z-20">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    </div>
                                    <div className="ml-4 text-[10px] text-zinc-600 font-mono">localhost:3000</div>
                                </div>

                                <Image
                                    src={project.image}
                                    alt="Interface"
                                    fill
                                    className="object-cover pt-8 transition-transform duration-1000 group-hover:scale-105"
                                />

                                {/* Glitch Overlay Effect */}
                                <div className="absolute inset-0 bg-[#beff01]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                            </div>
                        </motion.div>

                        {/* Decorative Elements behind */}
                        <div className="absolute -right-10 -bottom-10 w-full h-full border border-[#beff01]/20 z-0" />
                        <div className="absolute -right-20 -bottom-20 w-full h-full border border-dashed border-white/5 z-0" />
                    </div>
                </div>
            </section>

            {/* Results & Impact Section */}
            {project.results && project.results.length > 0 && (
                <section className="py-20 bg-[#080808] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {project.results.map((res, i) => (
                                <div key={i} className="p-6 bg-[#050505] border border-white/10 hover:border-[#beff01]/50 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <Terminal size={16} className="text-[#beff01]" />
                                    </div>
                                    <div className="text-zinc-500 text-xs font-bold uppercase mb-2">{res.metric}</div>
                                    <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-[#beff01] transition-colors">
                                        {res.value}
                                    </div>
                                    <div className="text-sm text-zinc-400 leading-relaxed">
                                        {res.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Challenge & Solution Section */}
            {(project.challenge || project.solution) && (
                <section className="py-20 bg-[#050505] border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Challenge */}
                            {project.challenge && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                                            <Terminal size={20} className="text-red-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">The Challenge</h3>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-zinc-300 text-lg leading-relaxed font-light">
                                            {project.challenge}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Solution */}
                            {project.solution && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[#beff01]/10 rounded-lg border border-[#beff01]/20">
                                            <Cpu size={20} className="text-[#beff01]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">The Solution</h3>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-zinc-300 text-lg leading-relaxed font-light">
                                            {project.solution}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Features & Gallery Section */}
            <section className="py-32 bg-[#080808] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">System <span className="text-[#beff01]">Architecture</span></h2>
                        <p className="text-zinc-400 max-w-2xl text-lg">
                            Core features and technical capabilities implemented in this build.
                        </p>
                    </div>

                    {/* Features Grid */}
                    {project.features && project.features.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                            {project.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                    <div className="mt-1">
                                        <ChevronRight size={16} className="text-[#beff01]" />
                                    </div>
                                    <span className="text-zinc-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Image Gallery */}
                    <div className="space-y-32">
                        {project.images.slice(1).map((img, i) => (
                            <div key={i} className={`flex flex-col gap-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                                <div className="lg:w-1/2 w-full">
                                    <div className="relative aspect-[16/10] bg-[#0a0a0a] border border-white/10 p-2 group">
                                        <div className="relative w-full h-full overflow-hidden bg-zinc-900">
                                            <Image src={img} alt={`Project View ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </div>
                                        {/* Corner Accents */}
                                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#beff01]" />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#beff01]" />
                                    </div>
                                </div>
                                <div className="lg:w-1/2 space-y-6">
                                    <div className="inline-block px-3 py-1 bg-[#beff01]/10 text-[#beff01] text-xs font-bold border border-[#beff01]/20">
                                        VIEW_0{i + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Interface Detail
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        High-fidelity interface design focusing on usability and data visualization.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Unique CTA: Terminal Style */}
            <section className="py-32 bg-[#020202] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block mb-8 p-4 bg-black border border-zinc-800 rounded-lg shadow-2xl">
                        <div className="flex gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-zinc-700" />
                            <div className="w-3 h-3 rounded-full bg-zinc-700" />
                            <div className="w-3 h-3 rounded-full bg-[#beff01]" />
                        </div>
                        <div className="text-left font-mono text-sm text-zinc-400">
                            <span className="text-[#beff01]">➜</span> <span className="text-white">~</span> initialize_project <span className="animate-pulse">_</span>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        Ready to <span className="text-[#beff01]">Deploy?</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Let's architect your next digital breakthrough. Scalable, secure, and stunning.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/contact" className="group relative px-8 py-4 bg-[#beff01] text-black font-bold text-lg overflow-hidden transition-all hover:bg-[#a8e600]">
                            <div className="absolute inset-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />
                            <span className="relative flex items-center gap-3">
                                Start Build <Terminal size={18} />
                            </span>
                        </Link>
                        <Link href="/services" className="px-8 py-4 border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors">
                            View Documentation
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
