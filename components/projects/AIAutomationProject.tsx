"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Network, Cpu, Workflow, Terminal, ArrowRight, Bot, Sparkles, BrainCircuit, X, Maximize2, ArrowUpRight } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SiOpenai, SiAnthropic, SiGoogle, SiMeta, SiPytorch, SiTensorflow, SiHuggingface, SiNvidia } from "react-icons/si";
import { FaRobot, FaBrain } from "react-icons/fa";

export default function AIAutomationProject({ project }: { project: IProject }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    // Adjusted opacity to stay visible longer or not fade out completely
    const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.2]);
    const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
    const heroY = useTransform(smoothProgress, [0, 0.3], [0, 50]);

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    const getAiModelIcon = (modelName: string) => {
        const lower = modelName.toLowerCase();
        if (lower.includes('gpt') || lower.includes('openai')) return <SiOpenai />;
        if (lower.includes('claude') || lower.includes('anthropic')) return <SiAnthropic />;
        if (lower.includes('gemini') || lower.includes('google') || lower.includes('palm')) return <SiGoogle />;
        if (lower.includes('llama') || lower.includes('meta') || lower.includes('facebook')) return <SiMeta />;
        if (lower.includes('pytorch')) return <SiPytorch />;
        if (lower.includes('tensorflow')) return <SiTensorflow />;
        if (lower.includes('hugging')) return <SiHuggingface />;
        if (lower.includes('nvidia')) return <SiNvidia />;


        return <FaBrain />;
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
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#beff01] animate-pulse" />
                    <span className="text-xs font-medium text-[#beff01] uppercase tracking-wider">SYSTEM_ONLINE</span>
                </div>
            </div>

            <div className="relative z-10 pt-48 md:pt-64 pb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

                    {/* Creative Hero Section */}
                    <div className="relative mb-24 md:mb-32" onMouseMove={handleMouseMove}>
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
                                    {/* AI Models - Modern Icon Display */}
                                    {project.aiModels && project.aiModels.length > 0 && (
                                        <div className="flex flex-col gap-3 lg:items-end">
                                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Neural Core</span>
                                            <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
                                                {project.aiModels.map((model, i) => (
                                                    <div key={i} className="group relative">
                                                        <div className="w-14 h-14 bg-zinc-900/80 border border-white/10 rounded-2xl flex items-center justify-center text-2xl text-zinc-400 hover:text-[#beff01] hover:border-[#beff01]/50 hover:bg-zinc-800 transition-all duration-300 shadow-lg backdrop-blur-sm cursor-help">
                                                            {getAiModelIcon(model)}
                                                        </div>
                                                        {/* Tooltip */}
                                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#beff01] text-black text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                                            {model}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                        className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-24 md:mb-32 group cursor-zoom-in"
                        onClick={() => {
                            console.log("Opening Cover Image:", project.image);
                            if (project.image) setSelectedImage(getAssetUrl(project.image));
                        }}
                    >
                        {project.image && (
                            <Image
                                src={getAssetUrl(project.image)}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Hover Overlay with Icon */}
                        <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                            <Maximize2 size={20} />
                        </div>

                        {/* Overlay Data */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
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

                    {/* ... (Workflow Section skipped) ... */}

                    {/* Creative Gallery Grid */}
                    {project.images && project.images.length > 0 && (
                        <div className="mb-24 md:mb-32">
                            {/* ... (Header skipped) ... */}
                            <div className="columns-1 md:columns-2 gap-8 space-y-8">
                                {project.images.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="relative break-inside-avoid group rounded-2xl overflow-hidden bg-zinc-900 cursor-zoom-in"
                                        onClick={() => {
                                            console.log("Opening Gallery Image:", img);
                                            setSelectedImage(getAssetUrl(img));
                                        }}
                                    >
                                        <Image
                                            src={getAssetUrl(img)}
                                            alt={`Gallery ${i}`}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[#beff01]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
                                        <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                            <Maximize2 size={16} />
                                        </div>
                                        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-[#beff01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            IMG_0{i + 1}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lightbox - Portaled to Body */}
                    <AnimatePresence>
                        {selectedImage && mounted && createPortal(
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelectedImage(null)}
                                className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                            >
                                {/* ... rest of lightbox ... */}
                                <div className="absolute top-8 right-8 z-[100000]">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="p-2 text-white/50 hover:text-[#beff01] transition-colors"
                                    >
                                        <X size={32} />
                                    </button>
                                </div>

                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center p-2"
                                >
                                    <div className="relative w-full h-[85vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                                        <Image
                                            src={selectedImage}
                                            alt="Gallery Preview"
                                            fill
                                            priority
                                            className="object-contain"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>,
                            document.body
                        )}
                    </AnimatePresence>

                </div>
            </div>

            {/* Footer - Angel Marketing CTA */}
            <section className="py-20 md:py-32 bg-[#beff01] text-black text-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-12 leading-[0.85]">
                        Ready To Put Your <br /> Operation On Autopilot?
                    </h2>
                    <Link href="/contact" className="inline-flex items-center gap-4 text-xl md:text-2xl font-bold uppercase tracking-widest hover:underline decoration-4 underline-offset-8 group">
                        Activate Autopilot <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </Link>
                </div>
            </section>

        </div>
    );
}