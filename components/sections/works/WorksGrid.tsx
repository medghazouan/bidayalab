'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Code, TrendingUp, Palette, Loader2 } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  client: string;
  duration: string;
  year: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

const categories = [
  { slug: 'all', label: 'All Projects', icon: Briefcase },
  { slug: 'web-dev', label: 'Web Development', icon: Code },
  { slug: 'paid-ads', label: 'Paid Ads', icon: TrendingUp },
  { slug: 'social-media', label: 'Social Media', icon: Palette },
];

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
      // Use requestAnimationFrame for smooth updates
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        lastCall = Date.now();
        func.apply(this, args);
      });
    }
  };
}

export default function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Use React Query for better caching and request deduplication
  const { data, isLoading, error: queryError } = useQuery<{ success: boolean; projects: Project[] }>({
    queryKey: ['projects', activeCategory],
    queryFn: async () => {
      const url = activeCategory === 'all' 
        ? '/api/projects' 
        : `/api/projects?category=${activeCategory}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const projects = data?.projects || [];
  const loading = isLoading;
  const error = queryError ? 'Error loading projects' : '';

  return (
    <section className="relative py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              My Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Projects That
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Speak For Themselves
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-20"
          >
            Real projects, real results. From stunning websites to marketing campaigns
            that convert—here's what I've built for businesses like yours.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16 flex flex-wrap justify-center gap-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.slug;
            return (
              <motion.button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300 disabled:opacity-50 ${
                  isActive
                    ? 'bg-[#beff01] text-black shadow-lg shadow-[#beff01]/30'
                    : 'bg-zinc-900/50 border border-zinc-800 text-gray-400 hover:border-[#beff01]/30 hover:bg-zinc-800/50'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={2.5} />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-[#beff01]" />
            </motion.div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center backdrop-blur-sm"
          >
            <p className="text-red-400 text-lg font-medium">{error}</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project._id} 
                  project={project} 
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-2xl text-gray-500 font-medium">
              No projects found in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

// Project Card Component - Matching Home Page Style
interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rectRef = useRef<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  // Optimized mouse move handler with cached rect and throttling
  const handleMouseMove = useCallback(
    throttleMouseMove((e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      // Cache rect to avoid repeated getBoundingClientRect calls
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
    }, 16), // Throttle to ~60fps
    [x, y]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Refresh rect cache on enter
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    // Clear rect cache
    rectRef.current = null;
  }, [x, y]);

  const getCategoryDisplay = (category: string) => {
    const categoryMap: Record<string, string> = {
      'web-dev': 'Web Development',
      'paid-ads': 'Paid Ads',
      'social-media': 'Social Media',
    };
    return categoryMap[category] || category;
  };

  return (
    <Link href={`/works/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ willChange: 'transform, opacity' }}
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
        className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800/50 cursor-pointer hover:border-[#beff01]/50 transition-all duration-300"
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
          <span className="inline-block bg-[#beff01] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-xl shadow-[#beff01]/30">
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