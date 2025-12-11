"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, MoveRight } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function CreativeStudioProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1.1, 1]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const textY = useTransform(smoothProgress, [0, 0.3], [0, -100]);

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    const getTechIcon = (tech: string) => {
        const lower = tech.toLowerCase();
        if (lower.includes('illustrator')) return '✒️';
        if (lower.includes('photoshop')) return '📷';
        if (lower.includes('figma')) return '🎨';
        if (lower.includes('after effects')) return '🎬';
        if (lower.includes('premiere')) return '🎞️';
        if (lower.includes('procreate')) return '✏️';
        if (lower.includes('indesign')) return '📰';
        if (lower.includes('blender') || lower.includes('3d') || lower.includes('cinema')) return '🧊';
        if (lower.includes('davinci')) return '🌈';
        if (lower.includes('lightroom')) return '🌅';
        return '⚡';
    };

    // Staggered columns for masonry
    const galleryImages = project.images.map(img => getAssetUrl(img));
    const col1 = galleryImages.filter((_, i) => i % 2 === 0);
    const col2 = galleryImages.filter((_, i) => i % 2 === 1);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-[#beff01] selection:text-black font-sans overflow-x-hidden">

            {/* Navigation - Minimalist */}
            <div className="absolute top-0 left-0 right-0 z-40 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mix-blend-difference pointer-events-none mt-24">
                <Link href="/works" className="pointer-events-auto group flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden md:block">Back</span>
                </Link>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#beff01]">
                    Creative Studio
                </div>
            </div>

            {/* Hero - Full Screen Artistic */}
            <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={getAssetUrl(project.image)}
                        alt={project.title}
                        fill
                        className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[2s]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505]" />
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl px-6 md:px-8 lg:px-12 mx-auto">
                    <motion.div style={{ y: textY }} className="flex flex-col items-center text-center">
                        <div className="mb-8 px-6 py-2 border border-white/10 rounded-full bg-black/20 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-zinc-400">
                            Case Study: {project.title}
                        </div>

                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mix-blend-overlay mb-8"
                        >
                            Design So Good, They Can&apos;t Ignore You.
                        </motion.h1>

                        <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mb-12 font-light leading-relaxed">
                            In a crowded market, blending in is a death sentence. We craft visual identities that demand attention and build instant trust.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs md:text-sm font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/10"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-zinc-500 text-[10px]">Client</span>
                                <span>{project.client}</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-zinc-500 text-[10px]">Year</span>
                                <span>{project.year}</span>
                            </div>
                            {project.duration && (
                                <>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-zinc-500 text-[10px]">Duration</span>
                                        <span>{project.duration}</span>
                                    </div>
                                </>
                            )}
                            {project.brandColors && (
                                <>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-zinc-500 text-[10px]">Palette</span>
                                        <div className="flex gap-2">
                                            {project.brandColors.map((c, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Content - Vertical Stack Layout */}
            <section className="relative z-10 bg-[#050505] pt-20 pb-20">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 space-y-32">

                    {/* Description */}
                    <div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800 mb-12">
                            The Concept
                        </h2>
                        <p className="text-3xl md:text-5xl font-light leading-tight max-w-5xl">
                            {project.description}
                        </p>
                    </div>

                    {/* Strategy */}
                    {project.brandStrategy && (
                        <div>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800 mb-12">
                                The Strategy
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-4xl">
                                {project.brandStrategy}
                            </p>
                        </div>
                    )}

                    {/* Deliverables */}
                    <div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800 mb-12">
                            Scope of Work
                        </h2>
                        <div className="space-y-2 max-w-4xl">
                            {project.deliverables?.map((item, i) => (
                                <div key={i} className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-[#beff01] hover:pl-4 transition-all duration-300 cursor-default">
                                    <div className="flex items-center gap-6">
                                        <span className="text-sm font-mono text-zinc-600 group-hover:text-[#beff01] transition-colors">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-xl font-light text-zinc-300 group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </div>
                                    <ArrowUpRight size={20} className="text-[#beff01] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800 mb-12">
                                Technologies
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {project.technologies.map((item, i) => (
                                    <div key={i} className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-[#beff01]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group-hover:border-[#beff01]/50 transition-colors duration-300">
                                            <span className="text-4xl filter drop-shadow-lg scale-100 group-hover:scale-110 transition-transform duration-300">{getTechIcon(item)}</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors text-center">
                                                {item}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Gallery - Artistic Masonry */}
            <section className="py-20 bg-[#050505]">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-8">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800">
                            Gallery
                        </h2>
                        <div className="hidden md:block text-right">
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Selected Works</div>
                            <div className="text-xl font-light">{project.images.length} Items</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        <div className="space-y-8 md:space-y-16">
                            {col1.map((img, i) => (
                                <motion.div
                                    key={`c1-${i}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8 }}
                                    className="relative group"
                                >
                                    <div className="overflow-hidden">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${i}`}
                                            width={1000}
                                            height={1200}
                                            className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-xs font-mono text-[#beff01]">FIG. {String(i * 2 + 1).padStart(2, '0')}</span>
                                        <ArrowUpRight size={14} className="text-[#beff01]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="space-y-8 md:space-y-16 md:pt-32">
                            {col2.map((img, i) => (
                                <motion.div
                                    key={`c2-${i}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8 }}
                                    className="relative group"
                                >
                                    <div className="overflow-hidden">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${i}`}
                                            width={1000}
                                            height={1200}
                                            className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-xs font-mono text-[#beff01]">FIG. {String(i * 2 + 2).padStart(2, '0')}</span>
                                        <ArrowUpRight size={14} className="text-[#beff01]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - Minimalist CTA */}
            <section className="py-40 bg-[#beff01] text-black text-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-[0.8]">
                        Next<br />Project?
                    </h2>
                    <Link href="/contact" className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        Let&apos;s Talk <MoveRight />
                    </Link>
                </div>
            </section>

        </div>
    );
}