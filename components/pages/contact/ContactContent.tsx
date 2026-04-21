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
              Contact <span className="text-zinc-700">BidayaLab</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl font-louis border-l-2 border-[#beff01] pl-6">
              Ready to scale? Let's discuss how we can help your business grow with expert Web Development and AI Solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Address & What Happens Next */}
      <section className="py-10 px-4 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-white/10 bg-white/[0.02]">
            <p className="text-[#beff01] text-xs font-louis uppercase tracking-widest mb-2">Our Office</p>
            <p className="text-white text-lg font-louis font-bold">Marrakech, Morocco</p>
            <p className="text-zinc-400 text-sm font-louis mt-1">Available for in-person meetings by appointment</p>
          </div>
          <div className="p-6 border border-white/10 bg-white/[0.02]">
            <p className="text-[#beff01] text-xs font-louis uppercase tracking-widest mb-2">What Happens Next?</p>
            <ol className="text-zinc-300 text-sm font-louis space-y-1 list-decimal list-inside">
              <li>We&apos;ll review your project details within 24 hours</li>
              <li>Our team will schedule a free consultation call</li>
              <li>You&apos;ll receive a tailored proposal and timeline</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        <ContactSection />
      </main>

      {/* Privacy Notice */}
      <section className="pb-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-zinc-600 font-louis">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-zinc-400 hover:text-[#beff01] underline transition-colors">Privacy Policy</a>
            {' '}and{' '}
            <a href="/terms" className="text-zinc-400 hover:text-[#beff01] underline transition-colors">Terms of Service</a>.
          </p>
        </div>
      </section>
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
