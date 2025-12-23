'use client';

import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '@/components/cards/BlogCard';

interface Blog {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  publicationDate: string;
  excerpt?: string;
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
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
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
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center mb-2"
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
              Insights & Strategy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-black text-white mb-2 tracking-tight leading-none flex flex-col items-center"
          >
            <span className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap block">Insights on AI</span>
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-[9vw] sm:text-[8vw] md:text-6xl lg:text-8xl xl:text-9xl leading-[0.8] whitespace-nowrap block mt-2">
              and Digital Growth
            </span>
          </motion.h2>


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