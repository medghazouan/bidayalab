'use client';

import { useRef, useState, useEffect } from 'react';

interface StackedSectionProps {
    children: React.ReactNode;
    className?: string;
    index: number;
}

export default function StackedSection({ children, className = "", index }: StackedSectionProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [stickyTop, setStickyTop] = useState("0px");

    // Height Calculation Logic
    useEffect(() => {
        if (!targetRef.current) return;
        const updateHeight = () => {
            const el = targetRef.current;
            if (!el) return;
            const height = el.offsetHeight;
            const vh = window.innerHeight;
            if (height > vh) {
                setStickyTop(`-${height - vh}px`);
            } else {
                setStickyTop("0px");
            }
        };
        const observer = new ResizeObserver(updateHeight);
        observer.observe(targetRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={targetRef}
            className={`sticky w-full origin-top bg-[#050505] border-t border-white/5 ${className}`}
            style={{
                zIndex: index * 10,
                top: stickyTop,
                minHeight: "100vh"
            }}
        >
            <div className="w-full relative h-full">
                {children}
            </div>
        </div>
    );
}
