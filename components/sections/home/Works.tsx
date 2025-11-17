'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
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
      // Use requestAnimationFrame for smooth updates
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        lastCall = Date.now();
        func.apply(this, args);
      });
    }
  };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
        className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 cursor-pointer hover:border-[#beff01]/50 transition-all duration-300"
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
            {project.category}
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

export default function Works() {
  // Use React Query for better caching and deduplication
  const { data, isLoading } = useQuery<{ success: boolean; projects: Project[] }>({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/projects?limit=3');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const projects = data?.projects?.slice(0, 3) || [];
  const loading = isLoading;

  return (
    <section id="works-section" className="relative pt-18 md:pt-32 pb-12 md:pb-16 overflow-hidden">
      {/* Divider Above Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-16">
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#beff01]/50 to-transparent"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              Real Projects, Real Results
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            See What I&apos;ve
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Built For Others
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-16"
          >
            These aren&apos;t just pretty websites or random ads. Each project here helped a real business 
            <span className="text-white font-semibold"> attract more customers</span>, 
            <span className="text-[#beff01] font-semibold"> increase sales</span>, and 
            <span className="text-white font-semibold"> grow faster</span>. 
            Yours could be next.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#beff01] border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl"
          >
            <Zap className="w-16 h-16 text-[#beff01] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Currently Cooking Up Some Amazing Projects
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              I&apos;m working on some exciting new work right now. But here&apos;s the thing—
              <span className="text-white font-semibold"> your project could be the next showcase piece</span>. 
              Let&apos;s make something incredible together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#beff01] text-black font-bold px-10 py-5 rounded-full hover:bg-[#a8e600] transition-all shadow-xl shadow-[#beff01]/30"
            >
              <span>Let&apos;s Create Your Success Story</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                 <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
              ))}
            </div>

            {/* View All Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link
                href="/works"
                className="group inline-flex items-center gap-3 bg-transparent border-2 border-[#beff01] text-[#beff01] font-bold px-10 py-5 rounded-full hover:bg-[#beff01]/10 transition-all backdrop-blur-xl shadow-lg shadow-[#beff01]/10 hover:shadow-[#beff01]/20"
              >
                <span>Explore All Projects</span>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </>
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