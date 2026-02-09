'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { getProjects } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import CallToAction from '@/components/sections/home/CallToAction';
import CreativeProjectCard from '@/components/projects/CreativeProjectCard';

export default function WorksPageClient() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all projects
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getProjects();
                // Fisher-Yates shuffle to randomize the order
                const shuffled = [...(data || [])];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                setProjects(shuffled);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Parallax & Scroll Effects
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main ref={containerRef} className="relative bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-[#beff01] selection:text-black">

            {/* GLOBAL NOISE OVERLAY */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* 1. HERO: KINETIC ARCHIVE HEADER */}
            <section className="relative min-h-[70vh] flex flex-col justify-end pb-20 pt-40 px-4 md:px-12 overflow-hidden border-b border-white/5">
                {/* Background Marquee Logic */}
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none select-none flex flex-col justify-center">
                    <Marquee speed={30} direction="left">WORK • CASE STUDIES • RESULTS • </Marquee>
                    <Marquee speed={20} direction="right">IMPACT • INNOVATION • GROWTH • </Marquee>
                </div>

                <div className="relative z-10 max-w-7xl w-full mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[12vw] md:text-[10vw] font-bold font-louis leading-[0.85] tracking-tighter uppercase text-white mix-blend-difference">
                            Our <span className="text-zinc-700">Work</span>
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl font-sans border-l-2 border-[#beff01] pl-6">
                            See how we've helped ambitious businesses scale with AI, web, and visual solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. THE PROJECT GRID - Using Home Page Card Style */}
            <section className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 py-20 min-h-[50vh]">
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="w-10 h-10 text-[#beff01] animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {projects.map((project, i) => (
                            <CreativeProjectCard
                                key={project._id}
                                project={{
                                    ...project,
                                    image: project.thumbnail || (project.gallery?.[0]),
                                }}
                                index={i}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* 3. CALL TO ACTION */}
            <CallToAction />

        </main>
    );
}



function Marquee({ children, direction = 'left', speed = 20 }: { children: React.ReactNode, direction?: 'left' | 'right', speed?: number }) {
    return (
        <div className="w-full flex overflow-hidden whitespace-nowrap py-2 opacity-30">
            <motion.div
                className="flex gap-12 text-[8vw] font-black font-louis text-white leading-none uppercase"
                animate={{ x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
            >
                {/* Triple Repeat for smoothness */}
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
            </motion.div>
        </div>
    )
}
