'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Team() {
    return (
        <section id="team-section" className="relative bg-transparent border-t border-zinc-900" style={{ fontFamily: "'Inter Display', 'Inter', sans-serif" }}>
            <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-2"
                >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                        <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">Leadership</span>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-louis font-bold text-white leading-[1.05] tracking-tight mb-4"
                >
                    Expertise You<br />
                    <span className="text-[#beff01]">Can Trust.</span>
                </motion.h2>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative aspect-square w-full max-w-md mx-auto bg-zinc-800"
                    >
                        {/* Use a placeholder image or a solid color if image doesn't exist */}
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-600 font-louis text-2xl">Founder's Portrait</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-3xl font-louis font-bold text-white mb-2">Mohamed</h3>
                        <p className="text-[#beff01] font-louis text-xl mb-6">Founder & Lead Engineer</p>
                        <p className="text-zinc-400 font-louis text-lg leading-relaxed mb-6">
                            With over a decade of experience in software engineering and digital transformation, Mohamed founded BidayaLab to bridge the gap between complex enterprise technology and growing SMEs.
                        </p>
                        <p className="text-zinc-400 font-louis text-lg leading-relaxed mb-6">
                            His expertise spans Next.js architecture, AI integration, and high-performance WebOps. By combining deep technical knowledge with a passion for visually stunning design, Mohamed leads a team that delivers unparalleled digital solutions.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#beff01] underline transition-colors">LinkedIn Profile</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
