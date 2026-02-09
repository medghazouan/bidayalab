'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StackedSectionProps {
    children: React.ReactNode;
    className?: string;
    index: number;
}

export default function StackedSection({ children, className = "", index }: StackedSectionProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [stickyTop, setStickyTop] = useState("0px");

    // Height Calculation Logic (Kept mostly same)
    useEffect(() => {
        if (!targetRef.current) return;
        const updateHeight = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                const height = entry.contentRect.height;
                const vh = window.innerHeight;
                if (height > vh) {
                    setStickyTop(`-${height - vh}px`);
                } else {
                    setStickyTop("0px");
                }
            }
        };
        const observer = new ResizeObserver(updateHeight);
        observer.observe(targetRef.current);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // EFFECT: Dimming
    // OLD WAY: filter: brightness() or opacity on container -> BROKE NESTED STICKY.
    // NEW WAY: An overlay div that merely sits on top and fades in.
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

    return (
        <motion.div
            ref={targetRef}
            className={`sticky w-full origin-top bg-[#050505] border-t border-white/5 ${className}`}
            style={{
                zIndex: index * 10,
                top: stickyTop,
                minHeight: "100vh"
            }}
        >
            {/* CONTENT WRAPPER: Must be pure. No transform, no filter, no opacity. */}
            {/* This ensures 'position: sticky' elements inside 'children' see the Viewport. */}
            <div className="w-full relative h-full">
                {children}
            </div>

            {/* OVERLAY: Visual Dimming Effect */}
            {/* Pointer events none so you can still click things if it's slightly dim (though usually this section is leaving frame) */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black pointer-events-none z-[999]"
            />
        </motion.div>
    );
}
