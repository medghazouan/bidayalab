/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Project {
  id?: string;
  _id?: string;
  title: string;
  category: string;
  thumbnail?: string; // Updated
  image?: string;     // Backward compat
  slug: string;
  description?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string; // Allow custom classes for creative grids
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

const getCategoryDisplay = (category: string) => {
  const categoryMap: Record<string, string> = {
    'creative-studio': 'Creative Studio',
    'web_development': 'Web Development',
    'digital-marketing': 'Digital Marketing',
    'visual_storytelling': 'Visual Storytelling',
    'visual-storytelling': 'Visual Storytelling', // Fallback
    'ai_automation': 'AI & Automation',
    'ai-automation': 'AI & Automation', // Fallback
  };
  return categoryMap[category] || category;
};

export default function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
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

  const getAssetUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("/") || path.startsWith("http")) return path;
    return `/uploads/projects/${path}`;
  };

  const assetUrl = getAssetUrl(project.thumbnail || project.image || "");

  return (
    <Link href={`/works/${project.slug}`} className={`block h-full ${className} group`}>
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
        className="relative w-full h-full min-h-[500px] md:min-h-[400px] overflow-hidden bg-[#050505] cursor-pointer border-r border-b border-white/10 hover:border-[#beff01]/50 transition-colors duration-500"
      >
        {/* Project Image - Sharp & Technical */}
        <div className="absolute inset-x-6 inset-t-6 bottom-24 overflow-hidden border border-white/10 group-hover:border-[#beff01]/30 transition-colors duration-500 bg-zinc-900">
          {assetUrl ? (
            <Image
              src={assetUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-zinc-800 font-bold text-4xl uppercase tracking-widest">{project.category.split('_')[0]}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-50" />

          {/* Tech Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#beff01] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#beff01] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-8 left-8 z-10">
          <span className="inline-block bg-[#beff01] text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            {getCategoryDisplay(project.category)}
          </span>
        </div>

        {/* Bottom Info Block */}
        <div className="absolute bottom-0 left-0 right-0 h-24 p-6 flex flex-col justify-center bg-[#050505] border-t border-white/5"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex justify-between items-end">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#beff01] transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <div className="w-6 h-6 border border-white/10 flex items-center justify-center group-hover:bg-[#beff01] group-hover:text-black transition-colors">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
            </div>
          </div>
        </div>

      </motion.div>
    </Link>
  );
}
