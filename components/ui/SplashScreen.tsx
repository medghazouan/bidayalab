'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (document.readyState === 'complete') {
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => setIsLoading(false), 1200);
            }, 1500);
            return () => clearTimeout(timer);
        }

        const handleLoad = () => {
            setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => setIsLoading(false), 1200);
            }, 1500);
        };

        window.addEventListener('load', handleLoad);

        const fallbackTimer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => setIsLoading(false), 1200);
        }, 4000);

        return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <>
            {/* Splash Screen with Creative Split Transition */}
            <AnimatePresence>
                {isLoading && (
                    <>
                        {/* Top Half - Slides Up */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: isExiting ? '-100%' : 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="fixed top-0 left-0 right-0 h-1/2 z-[99999] bg-black"
                        />

                        {/* Bottom Half - Slides Down */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: isExiting ? '100%' : 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="fixed bottom-0 left-0 right-0 h-1/2 z-[99999] bg-black"
                        />

                        {/* Content Layer */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isExiting ? 0 : 1 }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center pointer-events-none"
                        >
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: isExiting ? 0 : 1,
                                    scale: isExiting ? 1.1 : 1,
                                    y: isExiting ? -20 : 0
                                }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="mb-8"
                            >
                                <Image
                                    src="/assets/icons/newlogo.png"
                                    alt="Bidayalab"
                                    width={280}
                                    height={80}
                                    priority
                                    className="w-48 md:w-72 h-auto"
                                />
                            </motion.div>

                            {/* Tagline - Single Color */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isExiting ? 0 : 1,
                                    y: isExiting ? -10 : 0
                                }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="font-louis text-lg md:text-2xl lg:text-3xl text-zinc-400 tracking-wide text-center px-6"
                            >
                                Your Strategic Partner for Digital Transformation.
                            </motion.p>

                            {/* Loading Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isExiting ? 0 : 1 }}
                                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                                className="absolute bottom-20 w-24 h-[1px] bg-[#beff01] origin-center"
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {children}
            </motion.div>
        </>
    );
}
