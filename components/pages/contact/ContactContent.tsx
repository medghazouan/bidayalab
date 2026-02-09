'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ContactSection = dynamic(() => import('@/components/sections/contact/ContactSection'), {
  loading: () => <div className="h-screen bg-zinc-900 animate-pulse" />,
});

export default function ContactContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className="relative bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-[#beff01] selection:text-black">

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
          <Marquee speed={30} direction="left">START A PROJECT • GET IN TOUCH • COLLABORATE • </Marquee>
          <Marquee speed={20} direction="right">PARTNERSHIP • INNOVATION • GROWTH • </Marquee>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[12vw] md:text-[10vw] font-bold font-louis leading-[0.85] tracking-tighter uppercase text-white mix-blend-difference">
              Start <span className="text-zinc-700">Now</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl font-louis border-l-2 border-[#beff01] pl-6">
              Ready to scale? Let's discuss how we can help your business grow with expert Web Development and AI Solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        <ContactSection />
      </main>
    </div>
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
