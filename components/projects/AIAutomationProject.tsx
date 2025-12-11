"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Network, Cpu, Workflow, Terminal, ArrowRight } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function AIAutomationProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
    const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    // Mouse tracking for hero effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-[#030303] text-white font-sans selection:bg-[#beff01] selection:text-black overflow-hidden relative">

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-[#beff01]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Navigation */}
            <div className="absolute top-0 left-0 right-0 z-30 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mt-24">
                <Link href="/works" className="group flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span>Back to Works</span>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#beff01] animate-pulse" />
                    <span className="text-xs font-mono text-[#beff01] tracking-wider">SYSTEM_ONLINE</span>
                </div>
            </div>

            <div className="relative z-10 pt-48 md:pt-64 pb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

                    {/* Creative Hero Section */}
                    <div className="relative mb-40" onMouseMove={handleMouseMove}>
                        <motion.div
                            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                            className="relative z-10"
                        >
                            <div className="inline-flex items-center gap-2 mb-8 text-[#beff01] font-mono text-xs tracking-[0.2em] uppercase border border-[#beff01]/20 px-3 py-1 rounded bg-[#beff01]/5">
                                <Terminal size={14} />
                                <span>Case Study: {project.title}</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter text-white mix-blend-difference">
                                Work Less. Earn More. Let Robots Handle the Boring Stuff.
                            </h1>

                            <div className="grid lg:grid-cols-12 gap-12 items-end">
                                <div className="lg:col-span-7">
                                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light border-l-2 border-[#beff01] pl-6 mb-6">
                                        Your team is wasting hours on repetitive tasks. We build custom AI systems that automate the busywork so you can focus on strategy and sales.
                                    </p>
                                    <p className="text-sm text-zinc-500 font-mono pl-6">
                                        System Function: {project.description}
                                    </p>
                                </div>
                                <div className="lg:col-span-5 flex flex-col gap-4">
                                    {/* Dynamic Tech Stack in Hero */}
                                    <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                                        {project.aiModels?.map((model, i) => (
                                            <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 font-mono flex items-center gap-2">
                                                <Cpu size={12} className="text-[#beff01]" />
                                                {model}
                                            </div>
                                        ))}
                                        {project.integrations?.map((integration, i) => (
                                            <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 font-mono flex items-center gap-2">
                                                <Network size={12} className="text-blue-400" />
                                                {integration}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Background Glitch/Grid Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-20 pointer-events-none">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#beff01]/10 to-transparent blur-3xl" />
                        </div>
                    </div>

                    {/* Main Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-40 group"
                    >
                        {project.image && (
                            <Image
                                src={getAssetUrl(project.image)}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />

                        {/* Overlay Data */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            <div className="hidden md:block">
                                <div className="text-xs font-mono text-[#beff01] mb-2">SYSTEM_STATUS</div>
                                <div className="text-xl font-bold">OPERATIONAL</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-[#beff01] rounded-full animate-pulse" />
                                <div className="w-2 h-2 bg-[#beff01] rounded-full animate-pulse delay-75" />
                                <div className="w-2 h-2 bg-[#beff01] rounded-full animate-pulse delay-150" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Workflow / Process Section (Dynamic Data) */}
                    {project.workflowDescription && (
                        <div className="grid lg:grid-cols-12 gap-16 mb-40">
                            <div className="lg:col-span-4">
                                <div className="sticky top-32">
                                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
                                        SYSTEM <span className="text-white">PROTOCOL</span>
                                    </h2>
                                    <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
                                        Automated Workflow Execution
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-8">
                                <div className="bg-zinc-900/20 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[#beff01]/30 transition-colors duration-500">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Workflow size={120} />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold mb-6 text-white">Workflow Architecture</h3>
                                        <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
                                            {project.workflowDescription}
                                        </p>

                                        {/* Dynamic Integration Badges */}
                                        {(project.integrations && project.integrations.length > 0) && (
                                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                                {project.integrations.map((tool, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm font-mono text-zinc-400">
                                                        <div className="w-1.5 h-1.5 bg-[#beff01] rounded-full" />
                                                        {tool}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Creative Gallery Grid */}
                    {project.images && project.images.length > 0 && (
                        <div className="mb-40">
                            <div className="flex items-center justify-between mb-16">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                                    VISUAL <span className="text-white">LOGS</span>
                                </h2>
                                <div className="hidden md:block text-right font-mono text-xs text-[#beff01]">
                                    [ {project.images.length} RECORDS FOUND ]
                                </div>
                            </div>

                            <div className="columns-1 md:columns-2 gap-8 space-y-8">
                                {project.images.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="relative break-inside-avoid group rounded-2xl overflow-hidden bg-zinc-900"
                                    >
                                        <Image
                                            src={getAssetUrl(img)}
                                            alt={`Gallery ${i}`}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#beff01]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                                        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-[#beff01] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            IMG_0{i + 1}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Footer - Minimalist CTA */}
            <section className="py-40 bg-[#beff01] text-black text-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-[0.8]">
                        Next<br />Project?
                    </h2>
                    <Link href="/contact" className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        Let&apos;s Talk <ArrowRight />
                    </Link>
                </div>
            </section>

        </div>
    );
}