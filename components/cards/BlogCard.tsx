/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Blog {
    id: string;
    title: string;
    category: string;
    image: string;
    slug: string;
    publicationDate: string;
    excerpt?: string;
}

// Throttle utility for mouse move handlers
function throttleMouseMove<T extends (...args: any[]) => void>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    let rafId: number | null = null;
    return function (this: any, ...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        } else {
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                lastCall = Date.now();
                func.apply(this, args);
            });
        }
    };
}

export default function BlogCard({ blog, index, className = "", formatDate }: { blog: Blog; index: number; className?: string; formatDate?: (dateString: string) => string }) {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rectRef = useRef<DOMRect | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = useCallback(
        throttleMouseMove((e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;

            if (!rectRef.current) {
                rectRef.current = cardRef.current.getBoundingClientRect();
            }

            const rect = rectRef.current;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / rect.width - 0.5;
            const yPct = mouseY / rect.height - 0.5;

            x.set(xPct);
            y.set(yPct);
        }, 16),
        [x, y]
    );

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        if (cardRef.current) {
            rectRef.current = cardRef.current.getBoundingClientRect();
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
        rectRef.current = null;
    }, [x, y]);

    const defaultFormatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const displayDate = formatDate ? formatDate(blog.publicationDate) : defaultFormatDate(blog.publicationDate);

    return (
        <Link href={`/blogs/${blog.slug}`} className={`block h-full ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                }}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="group w-full h-full relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 cursor-pointer hover:border-[#beff01]/50 transition-all duration-300 flex flex-col"
            >
                {/* Glow Effect */}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -inset-1 bg-gradient-to-r from-[#beff01]/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
                    />
                )}

                {/* Blog Image - Flexible aspect ratio based on parent/flex */}
                <motion.div
                    className="relative w-full flex-grow min-h-[280px] overflow-hidden"
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src={blog.image.startsWith('/') || blog.image.startsWith('http') ? blog.image : `/uploads/blogs/${blog.image}`}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {/* Category Badge on Image */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="absolute top-4 left-4 z-10"
                    >
                        <span className="inline-block bg-[#beff01] text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xl shadow-[#beff01]/30 backdrop-blur-sm">
                            {blog.category}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Blog Title & Date - Fixed height content area */}
                <div className="p-6 relative z-10 bg-zinc-900/40">
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#beff01] transition-colors duration-300 tracking-tight line-clamp-2">
                        {blog.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{displayDate}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
