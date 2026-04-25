'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * Minimal, professional splash screen.
 *
 *  - Solid black background
 *  - Logo centered with a soft fade-in
 *  - Single thin progress line beneath the logo (lime accent)
 *  - Clean fade-out on exit (no split, no letter reveal, no aurora)
 */
export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsLoading(false), 700);
      }, 1200);
      return () => clearTimeout(timer);
    }

    const handleLoad = () => {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsLoading(false), 700);
      }, 1200);
    };

    window.addEventListener('load', handleLoad);

    const fallback = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsLoading(false), 700);
    }, 3500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center"
            aria-hidden={isExiting}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <Image
                src="/assets/icons/newlogo.png"
                alt="BidayaLab"
                width={280}
                height={80}
                priority
                fetchPriority="high"
                className="w-40 md:w-48 h-auto"
              />

              <div className="mt-10 relative h-px w-32 md:w-40 bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isExiting ? 1 : 0.85 }}
                  transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0 bg-[#beff01] origin-left"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
