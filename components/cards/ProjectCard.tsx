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
  image: string;
  slug: string;
  description?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Throttle utility for mouse move handlers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttleMouseMove<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let rafId: number | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    'digital-development': 'Digital Development',
    'digital-marketing': 'Digital Marketing',
    'visual-storytelling': 'Visual Storytelling',
    'ai-automation': 'AI & Automation',
  };
  return categoryMap[category] || category;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
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

  return (
    <Link href={`/works/${project.slug}`}>
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
        className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 cursor-pointer hover:border-[#beff01]/50 transition-all duration-300"
      >
        {/* Glow Effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -inset-1 bg-gradient-to-r from-[#beff01]/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
          />
        )}

        {/* Project Image */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="absolute top-6 left-6 z-10"
        >
          <span className="inline-block bg-[#beff01] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-xl shadow-[#beff01]/30 backdrop-blur-sm">
            {getCategoryDisplay(project.category)}
          </span>
        </motion.div>

        {/* Project Title */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 z-10"
          style={{ transform: 'translateZ(20px)' }}
        >
          <h3 className="text-3xl font-black text-white mb-2 group-hover:text-[#beff01] transition-colors duration-300 tracking-tight">
            {project.title}
          </h3>
        </motion.div>

        {/* Hover Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#beff01] mix-blend-overlay rounded-3xl"
        />
      </motion.div>
    </Link>
  );
}
