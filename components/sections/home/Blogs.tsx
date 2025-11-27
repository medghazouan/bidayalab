'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Calendar, BookOpen, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
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

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blogs/${blog.slug}`}>
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
        className="group relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 cursor-pointer hover:border-[#beff01]/50 transition-all duration-300"
      >
        {/* Glow Effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -inset-1 bg-gradient-to-r from-[#beff01]/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
          />
        )}

        {/* Blog Image */}
        <motion.div
          className="relative aspect-video overflow-hidden"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={blog.image}
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

        {/* Blog Title & Date - Below Image */}
        <div className="p-6">
          <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#beff01] transition-colors duration-300 tracking-tight line-clamp-2">
            {blog.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.publicationDate)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Blogs() {
  const { data, isLoading } = useQuery<{ success: boolean; blogs: Blog[] }>({
    queryKey: ['blogs', 'latest'],
    queryFn: async () => {
      const response = await fetch('/api/blogs?limit=3');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const blogs = data?.blogs?.slice(0, 3) || [];
  const loading = isLoading;

  return (
    <section className="relative pt-18 md:pt-32 pb-10 md:pb-16 overflow-hidden">
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
              Insights & Articles
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Latest from the
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Blog
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-16"
          >
            Discover insights,
            tips, and
            stories that inspire and inform.
          </motion.p>
        </motion.div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#beff01] border-t-transparent"></div>
          </div>
        ) : blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl"
          >
            <BookOpen className="w-16 h-16 text-[#beff01] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              More Content Coming Soon
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              I&apos;m crafting some amazing articles right now. Stay tuned for insightful content!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog, index) => (
                <BlogCard key={`${blog.id}-${index}`} blog={blog} index={index} />
              ))}
            </div>

            {/* Simple & Creative "Explore All Articles" Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-[#beff01] border border-white/10 hover:border-[#beff01] text-white hover:text-black font-bold transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-[#beff01]/20 hover:shadow-xl"
              >
                <span>Explore All Articles</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
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