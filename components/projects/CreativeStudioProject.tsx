"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Palette, Paintbrush, PenTool, TrendingUp } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef, useState, useEffect } from "react";

export default function CreativeStudioProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

    // Show all images
    const galleryImages = project.images;
    const col1 = galleryImages.filter((_, i) => i % 3 === 0);
    const col2 = galleryImages.filter((_, i) => i % 3 === 1);
    const col3 = galleryImages.filter((_, i) => i % 3 === 2);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-[#beff01]/30 font-sans overflow-x-hidden">

            {/* Sub-Navbar - Absolute & Transparent */}
            <div className="absolute top-[100px] left-0 right-0 z-30 w-full bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center py-4 pointer-events-auto">
                    <Link href="/works" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                        <div className="w-8 h-8 rounded bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-[#beff01]/50 transition-colors">
                            <ArrowLeft size={14} />
                        </div>
                        <span className="hidden md:block shadow-black drop-shadow-md">Back</span>
                    </Link>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-70 flex items-center gap-2 shadow-black drop-shadow-md">
                        <Palette size={14} className="text-[#beff01]" /> Creative Studio
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Brand Colors */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.brandColors?.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-12 h-12 rounded-full border border-white/20 shadow-lg hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-12 leading-[0.9] drop-shadow-2xl">
                            {project.title}
                            <span className="text-[#beff01]">.</span>
                        </h1>

                        <div className="relative mt-16">
                            {/* Glassmorphism Card */}
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transform -skew-y-1" />

                            <div className="relative grid md:grid-cols-12 gap-8 p-8 md:p-12">
                                {/* Challenge Section - Featured */}
                                <div className="md:col-span-7 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[#beff01]/10 rounded-full">
                                            <ArrowUpRight className="text-[#beff01]" size={20} />
                                        </div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#beff01]">The Challenge</h3>
                                    </div>
                                    <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-100">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Meta Details - Modern Grid */}
                                <div className="md:col-span-5 flex flex-col gap-8 justify-center pl-0 md:pl-4">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Client</h3>
                                            <p className="text-lg font-medium text-white">{project.client}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Year</h3>
                                            <p className="text-lg font-medium text-white">{project.year}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Deliverables</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {(project.deliverables?.length ? project.deliverables : project.technologies).map((item, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 hover:bg-[#beff01]/10 hover:border-[#beff01]/30 hover:text-[#beff01] transition-all cursor-default">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Strategy & Results Section - Unified Background */}
            {project.brandStrategy && (
                <section className="py-32 px-6 relative overflow-hidden bg-[#050505]">
                    {/* Abstract Background Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#beff01]/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div className="md:sticky md:top-32 relative">
                                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                                    Brand<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">Strategy</span>
                                </h2>
                                {/* Mobile Fix: Arrow positioned absolutely or hidden if obstructing, here we move it to bottom right on mobile */}
                                <div className="absolute -top-4 -right-4 md:static md:block">
                                    <ArrowUpRight size={64} className="text-[#beff01] opacity-50 md:opacity-100" />
                                </div>
                            </div>
                            <div className="space-y-16 pt-8 md:pt-0">
                                <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300 relative z-10">
                                    {project.brandStrategy}
                                </p>

                                {/* Results / Impact - Modern Cards */}
                                {project.results && project.results.length > 0 && (
                                    <div className="space-y-8">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#beff01] flex items-center gap-2">
                                            <TrendingUp size={16} /> Impact & Results
                                        </h3>
                                        <div className="grid gap-6">
                                            {project.results.map((res, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="group relative p-8 bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#beff01]/0 via-[#beff01]/5 to-[#beff01]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                                    <div className="flex items-end justify-between relative z-10">
                                                        <div>
                                                            <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter group-hover:text-[#beff01] transition-colors">
                                                                {res.value || res.change}
                                                            </div>
                                                            <div className="text-lg font-bold text-zinc-400 group-hover:text-white transition-colors">
                                                                {res.metric}
                                                            </div>
                                                        </div>
                                                        <div className="block max-w-[200px] text-right text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                            {res.description}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery - Parallax Grid (Modern Placement) - No Lightbox, No Grayscale */}
            <section className="py-32 px-4 md:px-6 overflow-hidden bg-transparent">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Column 1 - Slow Scroll */}
                        <div className="flex flex-col gap-8">
                            {col1.map((img, i) => (
                                <motion.div
                                    key={`col1-${i}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative group overflow-hidden rounded-lg aspect-[3/4]"
                                >
                                    <Image src={img} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Column 2 - Medium Scroll (Offset) */}
                        <div className="flex flex-col gap-8 md:pt-24">
                            {col2.map((img, i) => (
                                <motion.div
                                    key={`col2-${i}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative group overflow-hidden rounded-lg aspect-[3/4]"
                                >
                                    <Image src={img} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Column 3 - Fast Scroll */}
                        <div className="flex flex-col gap-8 md:pt-48">
                            {col3.map((img, i) => (
                                <motion.div
                                    key={`col3-${i}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative group overflow-hidden rounded-lg aspect-[3/4]"
                                >
                                    <Image src={img} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Unique CTA: Artistic Style (Green Theme) - Unified Background */}
            <section className="py-32 relative overflow-hidden bg-transparent">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#beff01]/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Paintbrush size={24} className="text-[#beff01]" />
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                        Let's Create <br /> <span className="text-[#beff01]">Art Together.</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
                        Transform your brand into a visual masterpiece. We blend strategy with creativity to deliver iconic results.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <Link href="/contact" className="group relative px-10 py-5 bg-[#beff01] text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-[#a8e600] hover:scale-105">
                            <span className="relative z-10 flex items-center gap-3">
                                Start Project <PenTool size={20} />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}