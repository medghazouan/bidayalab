'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * BidayaLab home loader.
 *
 * Design tokens:
 *  - Louis display (font-louis), bold + uppercase + tracking-tighter
 *  - Lime (#beff01) as the only accent
 *  - Mono eyebrow ("INDEX // 01") for laboratory-direction continuity
 *  - Dot-grid texture overlay (matches the rest of the site)
 *  - Aurora glow (top-right lime, bottom-left subtle white)
 *
 * Animation:
 *  1. Logo + eyebrow fade in
 *  2. "BIDAYA" word slides up letter-by-letter (stagger 30ms)
 *  3. "LAB" follows on a lime gradient sweep
 *  4. Tagline fades in below
 *  5. Progress bar fills along the bottom
 *  6. Exit: a single horizontal lime ribbon expands to full width and the
 *     screen splits along it, top half slides up, bottom half slides down.
 */
export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsLoading(false), 1200);
      }, 1800);
      return () => clearTimeout(timer);
    }

    const handleLoad = () => {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsLoading(false), 1200);
      }, 1800);
    };

    window.addEventListener('load', handleLoad);

    const fallback = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsLoading(false), 1200);
    }, 4500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallback);
    };
  }, []);

  // Stagger animation for the wordmark letters.
  const letterParent = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.04,
      },
    },
  } as const;

  const letterChild = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  } as const;

  const Letter = ({ children, lime = false }: { children: string; lime?: boolean }) => (
    <span className="inline-block overflow-hidden align-bottom leading-none">
      <motion.span
        variants={letterChild}
        className={
          'inline-block leading-none ' + (lime ? 'text-[#beff01]' : 'text-white')
        }
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <>
            {/* Top half — slides up on exit */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: isExiting ? '-100%' : 0 }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 right-0 h-1/2 z-[99999] bg-[#050505] overflow-hidden"
            >
              {/* Aurora */}
              <div
                className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.18] blur-[120px] pointer-events-none"
                style={{ background: '#beff01' }}
              />
              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
            </motion.div>

            {/* Bottom half — slides down on exit */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: isExiting ? '100%' : 0 }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="fixed bottom-0 left-0 right-0 h-1/2 z-[99999] bg-[#050505] overflow-hidden"
            >
              {/* Aurora (reversed) */}
              <div
                className="absolute -bottom-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.10] blur-[120px] pointer-events-none"
                style={{ background: '#ffffff' }}
              />
              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
            </motion.div>

            {/* Center seam — single lime ribbon that grows on exit */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isExiting ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-1/2 left-0 right-0 h-px z-[100001] bg-[#beff01] origin-left"
              style={{ boxShadow: '0 0 40px 4px rgba(190,255,1,0.55)' }}
            />

            {/* Content layer */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isExiting ? 0 : 1 }}
              transition={{ duration: 0.45 }}
              className="fixed inset-0 z-[100000] flex flex-col items-center justify-center pointer-events-none px-6"
            >
              {/* Eyebrow — laboratory style */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isExiting ? 0 : 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-10 flex items-center gap-3"
              >
                <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#beff01]">
                  INDEX // 01
                </span>
                <span className="h-px w-12 bg-white/30" />
                <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-white/60">
                  Marrakech
                </span>
              </motion.div>

              {/* Logo (small, above wordmark) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: isExiting ? 0 : 1,
                  scale: isExiting ? 1.05 : 1,
                  y: isExiting ? -16 : 0,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-6"
              >
                <Image
                  src="/assets/icons/newlogo.png"
                  alt="BidayaLab"
                  width={280}
                  height={80}
                  priority
                  fetchPriority="high"
                  className="w-32 md:w-40 h-auto opacity-90"
                />
              </motion.div>

              {/* Wordmark — letter-by-letter reveal */}
              <motion.h1
                variants={letterParent}
                initial="hidden"
                animate={isExiting ? 'hidden' : 'visible'}
                aria-label="BidayaLab"
                className="font-louis font-black uppercase tracking-tighter text-white leading-[0.85] text-center"
                style={{ fontSize: 'clamp(3rem, 12vw, 8.5rem)' }}
              >
                <span className="inline-flex">
                  <Letter>B</Letter>
                  <Letter>I</Letter>
                  <Letter>D</Letter>
                  <Letter>A</Letter>
                  <Letter>Y</Letter>
                  <Letter>A</Letter>
                </span>
                <span className="inline-flex ml-3">
                  <Letter lime>L</Letter>
                  <Letter lime>A</Letter>
                  <Letter lime>B</Letter>
                  <span className="inline-block overflow-hidden align-bottom leading-none">
                    <motion.span
                      variants={letterChild}
                      className="inline-block leading-none text-[#beff01]"
                    >
                      .
                    </motion.span>
                  </span>
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: isExiting ? 0 : 1,
                  y: isExiting ? -8 : 0,
                }}
                transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                className="mt-8 font-louis text-base md:text-xl text-zinc-400 tracking-wide text-center max-w-md"
              >
                Outcomes, not deliverables.
                <span className="text-white"> We don&apos;t sell websites — we sell measurable growth.</span>
              </motion.p>

              {/* Progress bar */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(320px,60vw)]">
                <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.22em] uppercase text-zinc-500">
                  <span>Loading lab</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isExiting ? 0 : 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#beff01]"
                  >
                    READY
                  </motion.span>
                </div>
                <div className="relative h-px w-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isExiting ? 1 : 0.85 }}
                    transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0 bg-[#beff01] origin-left"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
