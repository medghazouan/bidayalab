'use client';

import { useRouter } from 'next/navigation';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import {
    ArrowRight, Code2, Rocket, Bot, Zap,
    Globe, BarChart3, Workflow, MoveRight, Layers, Cpu
} from 'lucide-react';

export default function Hero() {
    const router = useRouter();

    const scrollToContact = () => {
        router.push('/contact#contact-form');
    };

    const pillars = [
        {
            id: "01",
            tag: "ARCHITECTURE",
            title: "Digital Ecosystems",
            description: "We engineering high-performance, SEO-dominating digital foundations using Next.js and headless architecture.",
            icon: Layers,
            features: ["Next.js Enterprise", "Global Edge CDN", "3D Web Experiences"]
        },
        {
            id: "02",
            tag: "INTELLIGENCE",
            title: "AI Workforce",
            description: "Replace repetitive drudgery with intelligent agents. We build custom AI workflows that automate sales, support, and operations.",
            icon: Cpu,
            features: ["Language Models", "Autonomous Agents", "Workflow Automation"]
        },
        {
            id: "03",
            tag: "GROWTH",
            title: "Revenue Engineering",
            description: "Creativity without conversion is vanity. We fuse brand storytelling with hard-data analytics to scale your bottom line.",
            icon: Rocket,
            features: ["Conversion Ops", "Performance Marketing", "Brand Strategy"]
        }
    ];

    return (
        // REMOVED: bg-black from section to allow global background
        <section className="relative pt-24 md:pt-36 lg:pt-40 pb-6 md:pb-12 overflow-hidden selection:bg-[#beff01] selection:text-black">

            {/* 
          1. AMBIENCE 
          (Removed noise overlay/solid bg. Kept subtle glows for depth/blending) 
      */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Glows - adjusted opacity for blending */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#beff01]/5 rounded-full blur-[140px] animate-pulse-slow mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

                {/* 
            2. ORIGINAL HEADER RESTORED EXACTLY 
        */}
                <div className="text-center mb-12 md:mb-16">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 group hover:bg-white/10 transition-all cursor-default"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#beff01] animate-pulse shadow-[0_0_10px_#beff01]" />
                        <span className="text-[#beff01] text-[10px] md:text-sm font-bold uppercase tracking-wider">
                            DIGITAL TRANSFORMATION STARTS HERE
                        </span>
                    </motion.div>

                    {/* PRESERVED TITLE (Exact Original Classes) */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-[40px] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tighter leading-none"
                    >
                        <span className="block whitespace-nowrap">Full-Service Digital.</span>
                        <span className="block whitespace-nowrap bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            AI-Driven Results.
                        </span>
                    </motion.h1>

                    {/* 
             WHO WE ARE - "Ultra Creative" Fusion Grid
             Using a sophisticated layout merging typography styles
          */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full mb-16 relative group"
                    >
                        {/* Subtle animated background gradient */}
                        <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[#beff01]/10 via-blue-500/10 to-[#beff01]/10 blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                        <div className="relative p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden hover:bg-black/30 transition-colors duration-500">

                            <div className="flex flex-col gap-6 text-center">
                                {/* Label */}
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-[#beff01]">
                                        <span className="w-1 h-1 rounded-full bg-[#beff01]" />
                                        We Are Bidayalab
                                    </span>
                                </div>

                                {/* Headline */}
                                <h2 className="text-2xl md:text-4xl leading-snug font-light text-white">
                                    We engineer the intersection of <br className="hidden md:block" />
                                    <span className="font-serif italic text-white/80">human creativity</span> <span className="text-zinc-600 px-1 font-thin">&</span> <span className="font-mono text-[#beff01] font-normal">artificial intelligence</span>
                                </h2>

                                {/* Paragraph */}
                                <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                                    Building digital ecosystems that scale revenue, automate drudgery, and define the future of your industry.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <button onClick={scrollToContact} className="group relative px-10 py-5 bg-[#beff01] text-black font-black uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_-15px_rgba(190,255,1,0.4)]">
                            <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-2">
                                Start a Project <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
                            </span>
                        </button>

                        <button onClick={() => router.push('/works')} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-6 py-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 uppercase tracking-wide font-bold text-sm">
                            View Case Studies <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* 3. WHAT WE OFFER (3 Pillars with Spotlight - Enhanced for Transparent BG) */}
                <div className="mb-12 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-6 mb-16 px-4 justify-center opacity-60"
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-32" />
                        <span className="text-[#beff01] font-mono text-xs uppercase tracking-[0.4em] text-center shadow-[0_0_20px_rgba(190,255,1,0.3)]">Our Capabilities</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-32" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {pillars.map((pillar, index) => (
                            <SpotlightCard key={index} delay={index * 0.1}>
                                <div className="relative h-full flex flex-col z-20">
                                    {/* Number Watermark */}
                                    <div className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.03] group-hover:text-[#beff01]/[0.1] transition-colors select-none font-sans pointer-events-none">
                                        {pillar.id}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#beff01] mb-8 group-hover:scale-110 group-hover:bg-[#beff01] group-hover:text-black group-hover:shadow-[0_0_30px_rgba(190,255,1,0.3)] transition-all duration-500">
                                        <pillar.icon size={26} strokeWidth={1.5} />
                                    </div>

                                    {/* Tag */}
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <div className="w-1 h-1 rounded-full bg-[#beff01] shadow-[0_0_10px_#beff01]" />
                                        <span className="text-[#beff01] text-[11px] font-bold font-mono tracking-[0.2em] uppercase opacity-90">
                                            {pillar.tag}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#beff01] transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
                                        {pillar.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <ul className="space-y-3">
                                            {pillar.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-xs text-zinc-500 font-mono group-hover:text-zinc-300 transition-colors">
                                                    <div className="w-1 h-1 bg-[#beff01]/50 rounded-full" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}

// Helper for Mouse Spotlight Effect
function SpotlightCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        mouseX.set(x);
        mouseY.set(y);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative border border-white/10 bg-white/[0.02] rounded-[2.5rem] overflow-hidden backdrop-blur-md hover:bg-white/[0.04] transition-colors"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(190, 255, 1, 0.1),
                transparent 80%
              )
            `,
                }}
            />
            <div className="relative h-full p-8 md:px-10 md:py-12 z-10">
                {children}
            </div>
        </motion.div>
    );
}
