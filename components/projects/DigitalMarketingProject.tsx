"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, TrendingUp, Target, ArrowUpRight, DollarSign, Activity, Globe, X } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef, useState } from "react";
import { FaGoogle, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTiktok, FaTwitter, FaPinterest, FaSnapchat, FaSpotify } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";

export default function DigitalMarketingProject({ project }: { project: IProject }) {
    const [selectedImage, setSelectedImage] = useState<{ src: string, type: string, description: string } | null>(null);
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

    const getPlatformIcon = (platform: string) => {
        const lower = platform.toLowerCase();
        if (lower.includes('google')) return <FaGoogle />;
        if (lower.includes('facebook') || lower.includes('meta')) return <FaFacebook />;
        if (lower.includes('instagram')) return <FaInstagram />;
        if (lower.includes('youtube')) return <FaYoutube />;
        if (lower.includes('linkedin')) return <FaLinkedin />;
        if (lower.includes('tiktok')) return <FaTiktok />;
        if (lower.includes('twitter') || lower.includes('x')) return <FaTwitter />;
        if (lower.includes('pinterest')) return <FaPinterest />;
        if (lower.includes('snapchat')) return <FaSnapchat />;
        if (lower.includes('spotify')) return <FaSpotify />;
        return <Globe size={16} />;
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
            {/* Navigation - Standardized */}
            <div className="absolute top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mt-24">
                <Link href="/works" className="group flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span>Back to Works</span>
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 bg-[#beff01] rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-[#beff01] uppercase tracking-wider">Live Campaign</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-48 md:pt-64 pb-20 min-h-screen flex flex-col justify-center">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-8 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left: Content */}
                    <div className="lg:col-span-7 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex flex-wrap gap-4 mb-10">
                                {project.platforms?.map((p, i) => (
                                    <div key={i}
                                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-zinc-400 hover:text-[#beff01] hover:bg-[#beff01]/10 hover:border-[#beff01]/30 hover:scale-110 hover:-rotate-6 transition-all duration-300 cursor-help shadow-lg backdrop-blur-md group"
                                        title={p}
                                    >
                                        <span className="filter drop-shadow-md">{getPlatformIcon(p)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4 text-[#beff01] font-mono text-sm tracking-widest uppercase">
                                Case Study: {project.title}
                            </div>

                            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-[0.9] md:leading-[0.85] tracking-tighter uppercase break-words">
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
                                <div
                                    className="relative aspect-[2/3] md:aspect-[4/5] w-full cursor-zoom-in"
                                    onClick={() => setSelectedImage({
                                        src: getAssetUrl(project.image),
                                        type: "Cover Image",
                                        description: project.title
                                    })}
                                >
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
            <section className="py-16 md:py-24 bg-[#050505] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
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
                <section className="py-16 md:py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
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
                                <div
                                    key={i}
                                    className="group relative bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#beff01] transition-colors cursor-zoom-in"
                                    onClick={() => setSelectedImage({
                                        src: getAssetUrl(creative.image || project.images?.[i] || ''),
                                        type: creative.type,
                                        description: creative.description
                                    })}
                                >
                                    <div className="aspect-[4/5] relative bg-zinc-900">
                                        {/* Placeholder for creative preview if no image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-9xl opacity-20 group-hover:opacity-10 transition-opacity">
                                            {i + 1}
                                        </div>
                                        {/* Updated to check creative.image first */}
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
                                                {/* Removed Platform Badge as per request */}
                                                <span className="px-3 py-1 bg-[#beff01] text-black text-xs font-bold uppercase rounded">
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
                        {/* Lightbox */}
                        <AnimatePresence>
                            {selectedImage && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedImage(null)}
                                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                                >
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-8 right-8 text-white/50 hover:text-[#beff01] transition-colors z-[110]"
                                    >
                                        <X size={32} />
                                    </button>

                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="relative max-w-7xl w-full max-h-[90vh] flex flex-col md:flex-row gap-8 bg-zinc-900/50 rounded-3xl border border-white/10 p-2 overflow-hidden"
                                    >
                                        <div className="relative flex-1 aspect-square md:aspect-auto min-h-[40vh] md:min-h-[80vh] rounded-2xl overflow-hidden bg-black/50">
                                            <Image
                                                src={selectedImage.src}
                                                alt={selectedImage.type}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="md:w-80 lg:w-96 p-6 flex flex-col justify-center shrink-0">
                                            <div className="text-[#beff01] text-xs font-bold uppercase tracking-widest mb-4">
                                                {selectedImage.type}
                                            </div>
                                            <div className="w-12 h-0.5 bg-white/20 mb-6" />
                                            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                                                {selectedImage.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 md:py-32 bg-[#beff01] text-black text-center relative overflow-hidden">
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