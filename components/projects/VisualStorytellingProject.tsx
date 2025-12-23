"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Aperture, Sliders, Clapperboard, ArrowUpRight, Film } from "lucide-react";
import { IProject } from "@/models/Project";
import { useRef } from "react";

export default function VisualStorytellingProject({ project }: { project: IProject }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });


    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

    const getAssetUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("/") || path.startsWith("http")) return path;
        return `/uploads/projects/${path}`;
    };

    return (
        <div ref={containerRef} className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#beff01] selection:text-black overflow-x-hidden">

            {/* Navigation Overlay */}
            {/* Navigation Overlay - Standardized */}
            <div className="absolute top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 flex justify-between items-center mt-24">
                <Link href="/works" className="group flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span>Back to Works</span>
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 bg-[#beff01] rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-[#beff01] uppercase tracking-wider">Visual Storytelling</span>
                </div>
            </div>

            {/* Cinematic Hero Section */}
            <section className="relative min-h-screen w-full overflow-hidden flex items-end pb-12 md:pb-24 pt-48 md:pt-64">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    {project.image && (
                        <Image
                            src={getAssetUrl(project.image)}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
                </motion.div>

                <motion.div
                    style={{ y: textY }}
                    className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                        <div className="space-y-4 md:space-y-8 max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20">
                                <Film size={12} /> Case Study: {project.title}
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                                Stories That Build Cults.
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
                                People don&apos;t buy products; they buy stories. We produce cinematic content that connects emotionally and drives action.
                            </p>
                        </div>

                        {/* Creative Specs - Cinematic Viewfinder Style */}
                        <div className="relative p-6 group min-w-[280px]">
                            {/* Viewfinder Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#beff01] opacity-50" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#beff01] opacity-50" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#beff01] opacity-50" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#beff01] opacity-50" />

                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Client</div>
                                    <div className="text-xl font-bold text-white tracking-wide">{project.client}</div>
                                </div>
                                <div className="flex gap-8">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Year</div>
                                        <div className="text-xl font-bold text-white tracking-wide">{project.year}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Duration</div>
                                        <div className="text-xl font-bold text-white tracking-wide">{project.duration}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Narrative & Production Specs */}
            <section className="relative z-10 py-16 md:py-24 px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* The Story */}
                    <div className="lg:col-span-7 space-y-12">
                        <h2 className="text-3xl md:text-5xl font-light leading-tight text-zinc-100">
                            {project.description}
                        </h2>
                        <div className="h-px w-32 bg-[#beff01]" />
                    </div>

                    {/* Production Data Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                            <h3 className="text-xs font-bold uppercase text-[#beff01] tracking-[0.2em] mb-8 flex items-center gap-2">
                                <Clapperboard size={16} /> Production Specs
                            </h3>

                            <div className="space-y-8">
                                {project.location && (
                                    <div className="group">
                                        <div className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-white transition-colors">
                                            <MapPin size={16} /> Location
                                        </div>
                                        <div className="text-2xl md:text-3xl font-light text-white">{project.location}</div>
                                    </div>
                                )}

                                {project.shootingStyle && (
                                    <div className="group border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-white transition-colors">
                                            <Aperture size={16} /> Shooting Style
                                        </div>
                                        <div className="text-2xl md:text-3xl font-light text-white">{project.shootingStyle}</div>
                                    </div>
                                )}

                                {project.postProduction && (
                                    <div className="group border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-white transition-colors">
                                            <Sliders size={16} /> Post Production
                                        </div>
                                        <div className="text-lg text-zinc-400 leading-relaxed font-light group-hover:text-zinc-300 transition-colors">
                                            {project.postProduction}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Feature Film */}
            {project.videoUrl && (
                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                        <div className="relative aspect-[4/3] md:aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group">
                            {getAssetUrl(project.videoUrl).startsWith('/uploads/') ? (
                                <video
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={project.image ? getAssetUrl(project.image) : undefined}
                                >
                                    <source src={getAssetUrl(project.videoUrl)} type="video/mp4" />
                                </video>
                            ) : (
                                <iframe
                                    src={project.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Visual Gallery - Masonry / Collage Style */}
            {project.images && project.images.length > 0 && (
                <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">
                            Behind<br />The Lens
                        </h2>
                        <div className="hidden md:block text-right">
                            <div className="text-4xl font-black text-[#beff01]">{project.images.length}</div>
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Captured Moments</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.images.map((img, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                key={i}
                                className={`relative group rounded-2xl overflow-hidden bg-zinc-900 ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-[4/5]'
                                    }`}
                            >
                                <Image
                                    src={getAssetUrl(img)}
                                    alt={`Gallery ${i}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA Section - Preserved "Perfect" Design */}
            <section className="py-20 md:py-32 bg-[#beff01] text-black text-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
                        READY TO TELL YOUR STORY?
                    </h2>
                    <Link href="/contact#contact-form" className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        LET&apos;S CREATE A MASTERPIECE <ArrowUpRight />
                    </Link>
                </div>
            </section>

        </div>
    );
}