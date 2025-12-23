"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, MoveRight, X, Maximize2 } from "lucide-react";
import { SiAdobeillustrator, SiAdobephotoshop, SiFigma, SiAdobeaftereffects, SiAdobepremierepro, SiAdobeindesign, SiBlender, SiCinema4D, SiDavinciresolve, SiAdobelightroom } from "react-icons/si";
import { FaPalette, FaBolt, FaPenNib } from "react-icons/fa";
import { IProject } from "@/models/Project";

export default function CreativeStudioProject({ project }: { project: IProject }) {
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
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1.1, 1]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const textY = useTransform(smoothProgress, [0, 0.3], [0, -100]);

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    const getTechIcon = (tech: string) => {
        // ... existing tech icon logic ...
        const lower = tech.toLowerCase();
        if (lower.includes('illustrator')) return <SiAdobeillustrator />;
        if (lower.includes('photoshop')) return <SiAdobephotoshop />;
        if (lower.includes('figma')) return <SiFigma />;
        if (lower.includes('after effects')) return <SiAdobeaftereffects />;
        if (lower.includes('premiere')) return <SiAdobepremierepro />;
        if (lower.includes('procreate')) return <FaPenNib />;
        if (lower.includes('indesign')) return <SiAdobeindesign />;
        if (lower.includes('blender')) return <SiBlender />;
        if (lower.includes('cinema')) return <SiCinema4D />;
        if (lower.includes('3d')) return <SiBlender />; // Default 3D to blender if not specified
        if (lower.includes('davinci')) return <SiDavinciresolve />;
        if (lower.includes('lightroom')) return <SiAdobelightroom />;
        return <FaBolt />;
    };

    // Staggered columns for masonry
    const galleryImages = project.images.map(img => getAssetUrl(img));
    const col1 = galleryImages.filter((_, i) => i % 2 === 0);
    const col2 = galleryImages.filter((_, i) => i % 2 === 1);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-[#beff01] selection:text-black font-sans overflow-x-hidden">

            {/* Navigation - Minimalist */}
            {/* Navigation - Standardized */}
            <div className="absolute top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mt-24 pointer-events-none">
                <Link href="/works" className="pointer-events-auto group flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span>Back to Works</span>
                </Link>
                <div className="hidden md:block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-[#beff01] uppercase tracking-wider">
                    Creative Studio
                </div>
            </div>

            {/* Hero - Full Screen Artistic */}
            <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0 cursor-zoom-in"
                    onClick={() => project.image && setSelectedImage(getAssetUrl(project.image))}
                >
                    <Image
                        src={getAssetUrl(project.image)}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60 hover:opacity-100 transition-all duration-[2s]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505] pointer-events-none" />
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl px-6 md:px-8 lg:px-12 mx-auto pointer-events-none">
                    <motion.div style={{ y: textY }} className="flex flex-col items-center text-center">
                        <div className="mb-8 px-6 py-2 border border-white/10 rounded-full bg-black/20 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-zinc-400 pointer-events-auto">
                            Case Study: {project.title}
                        </div>

                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mix-blend-overlay mb-8 break-words"
                        >
                            Design So Good, They Can&apos;t Ignore You.
                        </motion.h1>

                        {/* ... (Copy text and metadata - existing code) ... */}
                        <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mb-12 font-light leading-relaxed">
                            In a crowded market, blending in is a death sentence. We craft visual identities that demand attention and build instant trust.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs md:text-sm font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/10 pointer-events-auto"
                        >
                            {/* ... (Metadata content - existing code) ... */}
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
                    {/* ... (Description, Strategy, Deliverables, Technologies - existing code) ... */}
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.technologies.map((item, i) => (
                                    <div key={i} className="group relative aspect-square bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-[#beff01] hover:scale-[1.02]">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6">
                                            <div className="text-5xl text-zinc-500 group-hover:text-black transition-colors duration-500 scale-100 group-hover:scale-110 transform">
                                                {getTechIcon(item)}
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-black transition-colors duration-500 text-center">
                                                {item}
                                            </span>
                                        </div>
                                        {/* Creative Abstract Decoration */}
                                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-black/5 transition-colors duration-500" />
                                        <ArrowUpRight className="absolute top-6 right-6 text-black opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" size={20} />
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
                                    className="relative group cursor-zoom-in"
                                    onClick={() => setSelectedImage(img)}
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
                                        <Maximize2 size={14} className="text-[#beff01]" />
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
                                    className="relative group cursor-zoom-in"
                                    onClick={() => setSelectedImage(img)}
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
                                        <span className="text-xs font-mono text-[#beff01]">FIG. {String(i * 2 + 2).padStart(2, '0')}</span>
                                        <Maximize2 size={14} className="text-[#beff01]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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