'use client';

import { motion } from 'framer-motion';

export default function OurApproach() {
    return (
        <section className="relative z-10 w-full px-4 md:px-8 py-20 md:py-32 bg-black">
            {/* Creative Modern Label */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-2"
            >
                <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                    <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">Our Approach</span>
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </motion.div>

            {/* Big Title - Psychological/Conversational in Survalia */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-survalia text-white leading-[1.05] tracking-tight mb-12 md:mb-16"
            >
                It&apos;s Not About Your Product.<br />
                <span className="text-[#beff01]">It&apos;s About Your System.</span>
            </motion.h2>

            {/* 50/50 Split: Description Left (base height) + Image Right (matches left) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Side - Description + CTA Buttons (This is the height base) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col"
                >
                    <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-louis mb-10">
                        You&apos;re not losing clients because your product isn&apos;t good enough. You&apos;re losing them because competitors have better systems. We help Moroccan SMEs level the playing field. Through intelligent AI automation and world-class visual content, we transform your business into a digital powerhouse that attracts clients and competes globally.
                    </p>

                    {/* Creative CTA Buttons */}
                    <div className="flex flex-col gap-4">
                        {/* Primary CTA - High Conversion */}
                        <a
                            href="/contact"
                            className="group relative flex items-center justify-between px-8 py-5 bg-[#beff01] overflow-hidden transition-all duration-500"
                        >
                            <div className="relative z-10 flex flex-col">
                                <span className="text-black font-louis font-bold text-xl">Book Your Free Strategy Call</span>
                                <span className="text-black/60 text-sm font-louis">30-min consultation • No commitment</span>
                            </div>
                            <div className="relative z-10 w-12 h-12 bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <svg className="w-6 h-6 text-[#beff01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        </a>

                        {/* Secondary CTA - Social Proof */}
                        <a
                            href="/works"
                            className="group flex items-center justify-between px-8 py-5 border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#beff01]/50 hover:bg-[#beff01]/5"
                        >
                            <div className="flex flex-col">
                                <span className="text-white font-louis font-medium text-lg group-hover:text-[#beff01] transition-colors">See Our Success Stories</span>
                                <span className="text-zinc-500 text-sm font-louis">50+ projects delivered</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Mini avatars (social proof) */}
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-xs text-white">A</div>
                                    <div className="w-8 h-8 rounded-full bg-zinc-600 border-2 border-zinc-900 flex items-center justify-center text-xs text-white">B</div>
                                    <div className="w-8 h-8 rounded-full bg-[#beff01] border-2 border-zinc-900 flex items-center justify-center text-xs text-black font-bold">+</div>
                                </div>
                                <svg className="w-5 h-5 text-zinc-500 group-hover:text-[#beff01] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Right Side - Image (height matches left side) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative overflow-hidden bg-zinc-900 min-h-[300px] md:min-h-0"
                >
                    <img
                        src="/assets/images/approach-visual.png"
                        alt="Our Approach - Digital Transformation"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}
