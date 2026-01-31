"use client";

import { motion } from "framer-motion";
import { Search, Target, Zap, Rocket } from "lucide-react";

// Process steps data with Lucide icons
const processSteps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your brand, goals, and target audience to understand what makes you unique.",
        Icon: Search
    },
    {
        number: "02",
        title: "Strategy",
        description: "We craft a tailored roadmap that aligns with your objectives and sets clear milestones.",
        Icon: Target
    },
    {
        number: "03",
        title: "Design & Build",
        description: "Our team brings your vision to life with cutting-edge design and flawless execution.",
        Icon: Zap
    },
    {
        number: "04",
        title: "Launch & Grow",
        description: "We deploy, optimize, and scale your solution to maximize impact and drive real results.",
        Icon: Rocket
    }
];

export default function Process() {
    return (
        <section
            id="process-section"
            className="relative bg-[#000000] border-t border-zinc-900"
            style={{ fontFamily: "'Inter Display', 'Inter', sans-serif" }}
        >
            {/* Section Header - Same design as Services */}
            <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
                {/* Creative Modern Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-2"
                >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                        <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">Process</span>
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </motion.div>

                {/* Big Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-survalia text-white leading-[1.05] tracking-tight mb-4"
                >
                    How We<br />
                    <span className="text-[#beff01]">Make It Happen.</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
                >
                    A proven methodology that transforms ideas into exceptional digital experiences. Every project follows our battle-tested framework.
                </motion.p>
            </div>

            {/* Process Steps - Creative Grid */}
            <div className="px-4 md:px-8 pb-20 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                    {processSteps.map((step, index) => {
                        const IconComponent = step.Icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-[#beff01]/30 hover:bg-zinc-900/80">
                                    {/* Step Number - Large Background */}
                                    <div className="absolute -top-4 -right-4 text-[120px] md:text-[150px] font-survalia font-bold text-zinc-800/30 leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[#beff01]/10">
                                        {step.number}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col gap-4">
                                        {/* Icon with glow effect */}
                                        <motion.div
                                            className="w-14 h-14 flex items-center justify-center bg-zinc-800 border border-zinc-700 transition-all duration-500 group-hover:border-[#beff01]/50 group-hover:shadow-[0_0_20px_rgba(190,255,1,0.2)]"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <IconComponent className="w-7 h-7 text-white group-hover:text-[#beff01] transition-colors duration-300" strokeWidth={1.5} />
                                        </motion.div>

                                        {/* Step Number Label */}
                                        <span className="text-[#beff01] font-louis text-sm font-semibold tracking-wider">
                                            STEP {step.number}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-louis font-bold text-white transition-colors duration-300 group-hover:text-[#beff01]">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-zinc-400 font-louis text-sm md:text-base leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Animated line connector (hidden on last item) */}
                                        {index < processSteps.length - 1 && (
                                            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-zinc-700 to-transparent" />
                                        )}
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#beff01]/5 to-transparent" />
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <motion.div
                                    className="h-1 bg-zinc-800 mt-4 overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#beff01] to-[#8aff01]"
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.5 + index * 0.2,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-10 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-800"
                >
                    <p className="text-zinc-400 font-louis text-lg md:text-xl text-center md:text-left">
                        Your competitors aren't waiting.{" "}
                        <span className="text-white">Neither should you.</span>
                    </p>
                    <motion.a
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-[#beff01] text-black font-louis font-bold text-lg transition-all duration-300 hover:bg-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Claim Your Free Strategy Call
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

