'use client';

import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { useRef } from 'react';
import {
    AppWindow, ShoppingCart, Smartphone, LayoutTemplate, Network, Bot,
    ScanEye, TrendingUp, Workflow, BrainCircuit, Clapperboard, Box,
    Calendar, Plane, Film
} from 'lucide-react';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen pt-24 pb-20 overflow-visible flex flex-col items-start justify-center bg-black perspective-1000"
        >
            {/* SPOTLIGHT BACKGROUND EFFECT */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            800px circle at ${mouseX}px ${mouseY}px,
                            rgba(190, 255, 1, 0.04),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* SEO H1 */}
            <h1 className="sr-only">
                AI Automation & Web Development Agency Morocco | BidayaLab
            </h1>

            {/* 1. MASSIVE TITLE SECTION - ROYAL COCKTAIL */}
            <motion.div
                initial="hidden"
                animate="visible"
                style={{ opacity }}
                className="relative z-10 w-full px-2 md:px-4 mb-8 md:mb-12 flex flex-col items-start justify-center"
            >
                {/* 1. MASSIVE TITLE SECTION - ROYAL COCKTAIL */}
                {/* 1. MASSIVE TITLE SECTION - ROYAL COCKTAIL */}
                {/* 1. MASSIVE TITLE SECTION - ROYAL COCKTAIL */}
                {/* 1. MASSIVE TITLE SECTION - ROYAL COCKTAIL */}
                {/* ANIMATED WAVY LINE - Cursive flowing loops, synced with morph */}
                <div className="absolute inset-0 z-0 flex items-center pointer-events-none overflow-visible">
                    <svg
                        className="w-[130vw] h-[100%] absolute left-0 top-0"
                        viewBox="0 0 1600 500"
                        preserveAspectRatio="xMinYMid slice"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Cursive flowing path - like script letters "on" from reference */}
                        <path
                            d="M-50 350 
                               C -50 150, 80 80, 120 200 
                               C 160 320, 180 400, 250 400 
                               C 320 400, 350 150, 400 100 
                               C 450 50, 520 50, 560 150 
                               C 600 250, 620 380, 720 380 
                               C 820 380, 850 100, 920 80 
                               C 990 60, 1050 60, 1100 180 
                               C 1150 300, 1180 420, 1300 400 
                               C 1420 380, 1500 200, 1700 300"
                            stroke="#beff01"
                            strokeWidth="55"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            className="animate-wave-wipe-slow"
                            style={{
                                strokeDasharray: 4500,
                                strokeDashoffset: 4500,
                            }}
                        />
                    </svg>
                </div>

                <div className="relative z-10 w-full px-4 md:px-8 mb-12 md:mb-20 flex flex-col items-start justify-center overflow-hidden">

                    {/* LINE 1: Let's Scale -> And Automate -> To Dominate */}
                    <div className="w-full relative z-10 h-[25vw] md:h-[21vw] flex items-center justify-start pointer-events-none">
                        <GooeyText
                            texts={[
                                {
                                    text: "Let's Scale",
                                    className: "text-[25vw] md:text-[21vw] leading-[0.9] tracking-normal text-white font-survalia w-full text-left whitespace-nowrap antialiased"
                                },
                                {
                                    text: "And Automate",
                                    className: "text-[22vw] md:text-[19vw] leading-[0.9] tracking-normal text-white font-survalia w-full text-left whitespace-nowrap antialiased"
                                },
                                {
                                    text: "To Dominate",
                                    className: "text-[25vw] md:text-[21vw] leading-[0.9] tracking-normal text-white font-survalia w-full text-left whitespace-nowrap antialiased"
                                }
                            ]}
                            morphTime={2}
                            cooldownTime={2}
                            className="font-bold w-full"
                        />
                    </div>

                    {/* LINE 2: Your Business. -> Your Growth. -> Your Market. */}
                    <div className="w-full relative z-10 h-[25vw] md:h-[21vw] flex items-center justify-start pointer-events-none -mt-10 md:-mt-14">
                        <GooeyText
                            texts={[
                                {
                                    text: "Your Business.",
                                    className: "text-[21vw] md:text-[19vw] leading-[0.9] tracking-tight text-white font-survalia w-full text-left whitespace-nowrap antialiased"
                                },
                                {
                                    text: "Your Growth.",
                                    className: "text-[23vw] md:text-[19.5vw] leading-[0.9] tracking-tight text-white font-survalia w-full text-left whitespace-nowrap antialiased"
                                },
                                {
                                    text: "Your Market.",
                                    className: "text-[24vw] md:text-[20vw] leading-[0.9] tracking-tight text-white font-survalia w-full text-left whitespace-nowrap antialiased"
                                }
                            ]}
                            morphTime={2}
                            cooldownTime={2}
                            className="font-bold w-full"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
