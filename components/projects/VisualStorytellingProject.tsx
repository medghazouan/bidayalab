"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play, Film, MapPin, Aperture, Video, Clapperboard, Camera, Mic, Sliders, Layers, MonitorPlay } from "lucide-react";
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

    // Helper to get embed URL
    const getEmbedUrl = (url: string) => {
        if (url.includes('vimeo.com')) {
            const id = url.split('/').pop();
            return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`;
        }
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
            return `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&mute=1&loop=1&playlist=${id}&showinfo=0&rel=0&playsinline=1`;
        }
        return url;
    };

    return (
        <div ref={containerRef} className="bg-[#000000] min-h-screen text-white font-sans selection:bg-[#beff01]/30">

            {/* Sub-Navbar - Absolute & Transparent to overlay Hero */}
            <div className="absolute top-[100px] left-0 right-0 z-30 w-full bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center py-4 pointer-events-auto">
                    <Link href="/works" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#beff01] transition-colors">
                        <div className="w-8 h-8 rounded bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-[#beff01]/50 transition-colors">
                            <ArrowLeft size={14} />
                        </div>
                        <span className="hidden md:block shadow-black drop-shadow-md">Back</span>
                    </Link>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#beff01]/10 border border-[#beff01]/20 text-[#beff01] text-xs font-bold uppercase tracking-wider animate-pulse shadow-black drop-shadow-md">
                        <Film size={14} />
                        <span>VISUAL_NARRATIVE</span>
                    </div>
                </div>
            </div>

            {/* Fullscreen Hero */}
            <section className="relative h-screen sticky top-0 -z-10 overflow-hidden">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0"
                >
                    {project.videoUrl ? (
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                src={getEmbedUrl(project.videoUrl)}
                                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    ) : (
                        <>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-[#beff01]" />
                            <span className="text-[#beff01] font-bold uppercase tracking-[0.3em] text-sm">Cinematic Experience</span>
                        </div>
                        <h1 className="text-6xl md:text-[100px] font-black uppercase leading-[0.85] mb-12 tracking-tighter mix-blend-overlay opacity-90">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-8 text-sm font-bold uppercase tracking-widest text-zinc-300">
                            {project.technologies?.slice(0, 4).map((t, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#beff01] rounded-full" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <div className="relative z-10 bg-black pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-16">

                    {/* Narrative & Specs */}
                    <div className="grid lg:grid-cols-12 gap-16 mb-40 border-b border-zinc-900 pb-24">
                        <div className="lg:col-span-7">
                            <h3 className="text-sm font-bold uppercase text-[#beff01] mb-6 tracking-widest">The Narrative</h3>
                            <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300">
                                {project.description}
                            </p>

                            {/* Production Details Grid */}
                            <div className="grid grid-cols-2 gap-8 mt-16">
                                {project.location && (
                                    <div>
                                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                            <MapPin size={14} /> Location
                                        </div>
                                        <div className="text-white text-lg">{project.location}</div>
                                    </div>
                                )}
                                {project.shootingStyle && (
                                    <div>
                                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                            <Aperture size={14} /> Style
                                        </div>
                                        <div className="text-white text-lg">{project.shootingStyle}</div>
                                    </div>
                                )}
                                {project.postProduction && (
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
                                            <Sliders size={14} /> Post-Production
                                        </div>
                                        <div className="text-white text-lg leading-relaxed text-zinc-400">{project.postProduction}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Equipment List */}
                        <div className="lg:col-span-5">
                            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <Camera className="text-[#beff01]" size={24} />
                                    <h3 className="text-xl font-bold uppercase tracking-wider">Production Gear</h3>
                                </div>
                                <div className="space-y-4">
                                    {project.equipment?.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 group">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#beff01] transition-colors" />
                                            <span className="text-zinc-400 group-hover:text-white transition-colors text-sm font-mono leading-relaxed">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                    {!project.equipment && (
                                        <div className="text-zinc-500 italic">Equipment list confidential.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Player */}
                    {project.videoUrl ? (
                        <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden mb-40 group border border-zinc-800 shadow-2xl">
                            <iframe
                                src={project.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}
                                className="w-full h-full pointer-events-auto"
                                title="Main Film"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="relative w-full aspect-video mb-40 rounded-2xl overflow-hidden border border-zinc-800 group">
                            <Image src={project.images[0]} alt="Hero Frame" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full border border-[#beff01]/30 bg-[#beff01]/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                    <Play size={32} fill="#beff01" className="ml-1 text-[#beff01]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Grid */}
                    {project.results && project.results.length > 0 && (
                        <div className="mb-40">
                            <div className="flex items-end justify-between mb-12 border-b border-zinc-800 pb-6">
                                <h2 className="text-4xl font-bold">Impact & Reach</h2>
                                <div className="text-zinc-500 text-sm font-mono">PERFORMANCE_METRICS</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {project.results.map((res, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800 hover:border-[#beff01]/30 transition-colors group text-center">
                                        <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-[#beff01] transition-colors duration-300">
                                            {res.value}
                                        </div>
                                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                                            {res.metric}
                                        </div>
                                        <p className="text-xs text-zinc-600 leading-relaxed">
                                            {res.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cinematic Gallery */}
                    <div className="space-y-32">
                        {project.images.slice(1).map((img, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8 }}
                                key={i}
                                className={`flex flex-col gap-4 ${i % 2 !== 0 ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`relative w-full md:w-[85%] aspect-[2.39/1] bg-zinc-900 overflow-hidden group rounded-lg border border-zinc-800`}>
                                    <Image
                                        src={img}
                                        alt={`Cinematic Still ${i}`}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                    {/* Overlay Info */}
                                    <div className="absolute bottom-6 left-6 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-[#beff01] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        FRAME_CAPTURE_{i + 1}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Unique CTA: Cinematic Style */}
            <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/10">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#beff01]/5 blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-1 bg-[#beff01]" />
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                        Start Your <br /> <span className="text-[#beff01]">Masterpiece</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
                        From concept to final cut, we craft visual stories that captivate and inspire.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <Link href="/contact" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#beff01] text-black font-bold text-lg tracking-widest uppercase hover:bg-[#a8e600] transition-colors rounded-sm">
                            <Clapperboard size={20} />
                            <span>Start Production</span>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}