"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowLeft, ArrowRight, ArrowUpRight, Play, Maximize2, X, Quote, Zap,
    CheckCircle2, Cpu, Code2, Film, Layers, Globe, Database,
    Camera, MapPin, Calendar, Clock, BarChart3, Share2, Briefcase, Hash, Terminal
} from "lucide-react";
import { IProject } from "@/models/Project";
import CreativeProjectCard from "@/components/projects/CreativeProjectCard";
import StackedSection from "@/components/ui/StackedSection";

// --- Extended Icon Library ---
import {
    SiAdobeillustrator, SiAdobephotoshop, SiFigma, SiAdobeaftereffects, SiAdobepremierepro,
    SiAdobeindesign, SiBlender, SiCinema4D, SiDavinciresolve, SiAdobelightroom, SiOpenai,
    SiGoogleads, SiTiktok, SiMeta, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
    SiSupabase, SiStripe, SiPython, SiGo, SiPostgresql, SiMapbox, SiNodedotjs, SiGraphql,
    SiAwslambda, SiVuedotjs, SiThreedotjs, SiShopify, SiPytorch, SiTensorflow, SiDocker,
    SiKubernetes, SiMongodb, SiRedis, SiVercel, SiNetlify, SiWordpress, SiWebflow,
    SiFramer, SiUnrealengine, SiUnity, SiHuggingface, SiNotion, SiZapier
} from "react-icons/si";

// --- Intelligent Icon Matcher ---
const getTechIcon = (tech: string) => {
    if (!tech) return <Zap size={16} />;
    const lower = tech.toLowerCase();

    // Design & Creative
    if (lower.includes('illustrator')) return <SiAdobeillustrator className="text-[#ff9a00]" />;
    if (lower.includes('photoshop')) return <SiAdobephotoshop className="text-[#31a8ff]" />;
    if (lower.includes('figma')) return <SiFigma />;
    if (lower.includes('after effects')) return <SiAdobeaftereffects className="text-[#9999ff]" />;
    if (lower.includes('premiere')) return <SiAdobepremierepro className="text-[#9999ff]" />;
    if (lower.includes('blender')) return <SiBlender className="text-orange-500" />;

    // Development
    if (lower.includes('react')) return <SiReact className="text-[#61dafb]" />;
    if (lower.includes('next')) return <SiNextdotjs />;
    if (lower.includes('typescript') || lower.includes('ts')) return <SiTypescript className="text-[#3178c6]" />;
    if (lower.includes('node')) return <SiNodedotjs className="text-[#339933]" />;
    if (lower.includes('python')) return <SiPython className="text-[#3776ab]" />;
    if (lower.includes('go')) return <SiGo className="text-[#00add8]" />;
    if (lower.includes('postgres')) return <SiPostgresql className="text-[#336791]" />;
    if (lower.includes('mongo')) return <SiMongodb className="text-[#47a248]" />;
    if (lower.includes('aws')) return <SiAwslambda className="text-[#ff9900]" />;
    if (lower.includes('vercel')) return <SiVercel />;

    // AI
    if (lower.includes('gpt') || lower.includes('openai')) return <SiOpenai />;
    if (lower.includes('claude')) return <Cpu />;

    return <Code2 size={16} />;
};

const getCategoryLabel = (cat: string) => {
    switch (cat) {
        case 'ai_automation': return 'AI Intelligence';
        case 'visual_storytelling': return 'Visual Storytelling';
        case 'web_development': return 'Web Development';
        default: return 'Case Study';
    }
};

const useProjectData = (project: IProject) => {
    const isAI = project.category === 'ai_automation';
    const isVisual = project.category === 'visual_storytelling';

    return {
        stackTitle: isAI ? 'Neural Stack' : isVisual ? 'Production Role' : 'Technologies',
        stackItems: isAI ? project.aiTools : isVisual ? [project.productionRole || "Creative"] : project.techStack,
        impactTitle: 'Key Outcome',
        impactValue: project.result,
        linkTitle: 'Live Project',
        linkUrl: project.liveUrl || project.caseStudyUrl,
        heroMedia: project.thumbnail,
    };
};

export default function UniversalProject({ project, relatedProjects }: { project: IProject, relatedProjects?: IProject[] }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const data = useProjectData(project);
    const dateStr = new Date(project.completedAt).getFullYear().toString();
    const [mounted, setMounted] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { current } = sliderRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => setMounted(true), []);

    const isVisual = project.category === 'visual_storytelling';
    const isAI = project.category === 'ai_automation';

    // Gallery Logic (Exclude Hero)
    const galleryImages = (project.gallery || []).filter(img => img !== data.heroMedia);
    const resultImages = galleryImages.slice(0, 2);
    const remainingGallery = galleryImages.slice(2);

    return (
        <main className={`bg-[#050505] min-h-screen text-zinc-300 font-sans selection:bg-[#beff01] selection:text-black transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

            {/* --- HERO SECTION (Immersive V12) --- */}
            <StackedSection index={0}>
                <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
                    {/* 1. Background Media (Full Cover - Static Image for All) */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={data.heroMedia}
                            alt="Cover Details"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* 2. Gradient Overlay (Seamless Blend) */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

                    {/* 3. Hero Content */}
                    <div className="relative z-20 px-6 md:px-12 w-full pb-12 md:pb-24 max-w-[1920px] mx-auto">
                        <div className="flex flex-col gap-6">
                            {/* Top: Industry Label */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="h-[1px] w-8 bg-[#beff01]" />
                                <span className="text-[#beff01] font-mono text-sm uppercase tracking-widest">
                                    {project.industry}
                                </span>
                            </motion.div>

                            {/* Center: Title & Button */}
                            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                                <motion.h1
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="text-[12vw] md:text-[9vw] leading-[0.8] font-black font-louis text-white uppercase tracking-tighter mix-blend-screen"
                                >
                                    {project.title}
                                </motion.h1>

                                {/* Side: View Button (Desktop) */}
                                {data.linkUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="hidden md:block mb-4"
                                    >
                                        <Link href={data.linkUrl} target="_blank" className="group flex items-center gap-3 bg-[#beff01] hover:bg-white border border-[#beff01] hover:border-white px-6 py-3 transition-all duration-300">
                                            <span className="text-black font-bold uppercase tracking-wider text-sm">View Live</span>
                                            <ArrowUpRight className="w-4 h-4 text-black transition-transform group-hover:rotate-45" />
                                        </Link>
                                    </motion.div>
                                )}
                            </div>

                            {/* Bottom: Client & Year */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex items-center gap-8 md:gap-16 pt-4 text-zinc-400 font-mono text-xs uppercase tracking-widest border-t border-white/10 mt-2"
                            >
                                <div>
                                    <span className="block text-zinc-600 mb-1">Client</span>
                                    <span className="text-white">{project.clientName}</span>
                                </div>
                                <div>
                                    <span className="block text-zinc-600 mb-1">Year</span>
                                    <span className="text-white">{dateStr}</span>
                                </div>
                                {/* Mobile View Button */}
                                {data.linkUrl && (
                                    <Link href={data.linkUrl} target="_blank" className="md:hidden ml-auto flex items-center gap-2 text-[#beff01]">
                                        <span>View</span>
                                        <ArrowUpRight size={14} />
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>
            </StackedSection>

            {/* --- PROJECT OVERVIEW (Standard Layout) --- */}
            <StackedSection index={1}>
                <section className="px-4 md:px-8 py-24 max-w-[1920px] mx-auto border-b border-white/5">
                    <div className="flex flex-col lg:flex-row items-end gap-16 justify-between">
                        {/* Left: Description & Tech Stack (Enhanced V19) */}
                        <div className="w-full flex flex-col gap-16">
                            {/* 1. Project Brief */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-1 bg-[#beff01] shadow-[0_0_8px_#beff01] rounded-full" />
                                    <span className="text-[#beff01] font-mono text-xs uppercase tracking-[0.2em] opacity-80">PROJECT BRIEF</span>
                                </div>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="text-3xl md:text-5xl font-light text-white leading-[1.1]"
                                >
                                    {project.summary}
                                </motion.p>
                            </div>

                            {/* 2. System Architecture (Creative Modern Pill Design) */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1 h-1 bg-zinc-500 rounded-full" />
                                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">POWERED BY</span>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {(data.stackItems as string[] || []).map((item, i) => (
                                        <div
                                            key={i}
                                            className="group relative px-6 py-3 bg-white/5 border border-white/10 flex items-center gap-3 transition-all duration-300 hover:bg-[#beff01] hover:border-[#beff01] hover:scale-105 cursor-default"
                                        >
                                            {/* Icon */}
                                            <div className="text-zinc-400 group-hover:text-black transition-colors duration-300">
                                                {getTechIcon(item)}
                                            </div>

                                            {/* Text */}
                                            <span className="text-sm font-medium text-zinc-300 group-hover:text-black uppercase tracking-wider transition-colors duration-300">
                                                {item}
                                            </span>

                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 rounded-full ring-2 ring-[#beff01] opacity-0 group-hover:ring-opacity-50 group-hover:animate-pulse transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>



                    </div>
                </section>
            </StackedSection>

            {/* --- VISUAL PROJECT VIDEO (Full Width Below Overview) --- */}
            {
                isVisual && (
                    <StackedSection index={2}>
                        <section className="px-4 md:px-8 py-12 max-w-[1920px] mx-auto border-b border-white/5">
                            <div className="w-full aspect-video bg-zinc-900 border border-white/10 relative group overflow-hidden">
                                {project.liveUrl?.includes('vimeo') || project.liveUrl?.includes('youtube') ? (
                                    <iframe
                                        src={project.liveUrl.replace('vimeo.com/', 'player.vimeo.com/video/').replace('watch?v=', 'embed/')}
                                        className="w-full h-full"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        title="Project Video"
                                    />
                                ) : (
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                    >
                                        <source src="/placeholder-video.mp4" type="video/mp4" />
                                        <div className="flex items-center justify-center w-full h-full text-zinc-500">
                                            Video Unavailable
                                        </div>
                                    </video>
                                )}
                            </div>
                        </section>
                    </StackedSection>
                )
            }

            {/* --- NARRATIVE & VISUAL SPLIT (Unified Story) --- */}
            <StackedSection index={3}>
                <section className="px-4 md:px-8 py-24 max-w-[1920px] mx-auto border-b border-white/5">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">

                        {/* LEFT: The Narrative (Timeline Flow) */}
                        <div className="relative flex flex-col gap-20 pl-4 md:pl-0">
                            {/* Timeline Line */}
                            <div className="absolute left-0 md:left-4 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#beff01] via-[#beff01]/50 to-transparent hidden md:block" />

                            {/* 1. Challenge */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative md:pl-16"
                            >
                                <span className="absolute left-[-5px] top-3 w-3 h-3 bg-[#050505] border border-[#beff01] rounded-full hidden md:block" />
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[#beff01] font-mono text-xs uppercase tracking-widest opacity-80">01. PHASE I</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black font-louis text-white uppercase mb-6 leading-[0.9]">
                                    The <br /> Challenge
                                </h3>
                                <p className="text-xl text-zinc-400 font-light leading-relaxed">
                                    {project.challenge}
                                </p>
                            </motion.div>

                            {/* 2. Solution */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative md:pl-16"
                            >
                                <span className="absolute left-[-5px] top-3 w-3 h-3 bg-[#beff01] shadow-[0_0_10px_#beff01] rounded-full hidden md:block" />
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[#beff01] font-mono text-xs uppercase tracking-widest opacity-80">02. EXECUTION</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black font-louis text-white uppercase mb-6 leading-[0.9]">
                                    The <br /> Solution
                                </h3>
                                <p className="text-xl text-zinc-400 font-light leading-relaxed">
                                    {project.solution}
                                </p>
                            </motion.div>

                            {/* 3. Outcome (Result) */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative md:pl-16 pt-8"
                            >
                                <span className="absolute left-[-5px] top-11 w-3 h-3 bg-[#050505] border border-white rounded-full hidden md:block" />
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-white font-mono text-xs uppercase tracking-widest opacity-60">03. IMPACT</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black font-louis text-white uppercase mb-8 leading-[0.9]">
                                    Key <br /> Outcome
                                </h3>

                                {/* Creative Data Block */}
                                <div className="relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#beff01]" />
                                    <div className="pl-6 py-2">
                                        <h4 className="text-5xl md:text-7xl font-black font-louis text-white italic tracking-tighter mix-blend-screen mb-2">
                                            {data.impactValue}
                                        </h4>
                                        <p className="flex items-center gap-2 text-sm font-mono text-[#beff01] uppercase tracking-widest">
                                            <span className="w-2 h-2 bg-[#beff01] rounded-full" />
                                            Measurable Success
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                        {/* RIGHT: Visual Anchor (Sticky Image) */}
                        <div className="lg:sticky lg:top-32 self-start h-full max-h-[120vh]">
                            {resultImages[0] && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative w-full h-full min-h-[60vh] md:min-h-[80vh] bg-zinc-900 border border-white/10 overflow-hidden group"
                                    onClick={() => setSelectedImage(resultImages[0])}
                                >
                                    <Image
                                        src={resultImages[0]}
                                        alt="Visual Anchor"
                                        fill
                                        className="object-cover transition-all duration-700 hover:scale-105 cursor-zoom-in"
                                    />
                                </motion.div>
                            )}
                        </div>

                    </div>
                </section>
            </StackedSection>

            {/* --- 9. TESTIMONIAL (High Contrast) --- */}
            {
                project.testimonial && (
                    <StackedSection index={4}>
                        <section className="py-32 px-6 md:px-12 bg-white text-black relative overflow-hidden mb-24">
                            <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-black text-[#beff01] flex items-center justify-center shrink-0">
                                    <Quote size={40} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-black font-louis uppercase leading-[0.9] mb-12">
                                        &quot;{project.testimonial.quote}&quot;
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="h-[1px] w-12 bg-black" />
                                        <div>
                                            <span className="block text-lg font-bold uppercase tracking-widest">{project.testimonial.author.name}</span>
                                            <span className="text-xs text-zinc-600 uppercase tracking-widest">{project.testimonial.author.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </StackedSection>
                )
            }

            {/* --- THE STREAM (Remaining Images) --- */}
            <StackedSection index={5}>
                <section className="px-4 md:px-8 pb-32 max-w-[1920px] mx-auto">
                    {/* Include the second result image and the rest */}
                    {(() => {
                        const streamImages = [resultImages[1], ...remainingGallery].filter(Boolean);
                        if (streamImages.length === 0) return null;

                        return (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                                {streamImages.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className={`relative bg-zinc-900 group overflow-hidden cursor-zoom-in ${i % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Stream ${i}`}
                                            fill
                                            className="object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        );
                    })()}
                </section>
            </StackedSection>




            {/* Lightbox */}
            {
                selectedImage && (
                    <div
                        className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-0 cursor-zoom-out backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
                            <Image src={selectedImage} alt="Zoom" fill className="object-contain" />
                        </div>
                    </div>
                )
            }

            {/* --- 10. SELECTED WORKS (Slider) --- */}
            {relatedProjects.length > 0 && (
                <StackedSection index={6}>
                    <section className="bg-[#050505] border-t border-white/10 overflow-hidden py-16 md:py-24">
                        <div className="px-6 md:px-12 mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-5xl md:text-7xl font-louis font-bold text-white leading-[1.05] tracking-tight"
                            >
                                Selected<br />
                                <span className="text-[#beff01]">Works.</span>
                            </motion.h2>
                        </div>

                        {/* Infinite Marquee Slider - Full Width */}
                        <div className="w-full overflow-hidden">
                            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-0">
                                {/* Triple the list for seamless loop */}
                                {[...relatedProjects, ...relatedProjects, ...relatedProjects].map((p, i) => (
                                    <div key={`${p._id}-${i}`} className="min-w-[400px] md:min-w-[500px] w-[30vw]">
                                        <CreativeProjectCard
                                            project={{
                                                ...p,
                                                image: p.thumbnail || p.gallery?.[0],
                                            }}
                                            index={i}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </StackedSection>
            )}

            {/* --- 11. FULL WIDTH CTA --- */}
            <StackedSection index={7}>
                <section className="bg-[#beff01] py-32 relative overflow-hidden">
                    {/* Background Texture/Noise */}
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

                    <div className="px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 max-w-[1920px] mx-auto">
                        <div className="max-w-4xl">
                            <h2 className="text-[12vw] md:text-[8vw] font-black font-louis text-black leading-[0.8] tracking-tighter mb-8">
                                LET'S BUILD<br />THE FUTURE.
                            </h2>
                            <p className="text-xl md:text-2xl font-mono text-black/80 max-w-xl">
                                Ready to turn your ambitious ideas into reality? Let's create something extraordinary together.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="group bg-black text-[#beff01] px-12 py-8 md:px-16 md:py-10 text-xl md:text-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 whitespace-nowrap"
                        >
                            <span className="flex items-center gap-4">
                                Start Project <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </section>
            </StackedSection>

        </main >
    );
}
