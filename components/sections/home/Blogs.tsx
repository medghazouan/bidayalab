'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

interface Blog {
  id: string;
  _id?: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  publicationDate: string;
  excerpt?: string;
}

// Blog Card Component matching the screenshot design
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const getAssetUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("/") || path.startsWith("http")) return path;
    return `/uploads/blogs/${path}`;
  };

  const assetUrl = getAssetUrl(blog.image);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const getCategoryDisplay = (category: string) => {
    const categoryMap: Record<string, string> = {
      'ai-automation': 'AI & Tech',
      'digital-marketing': 'Marketing',
      'web-development': 'Development',
      'branding': 'Branding',
      'trends': 'Trends',
      'strategy': 'Strategy',
    };
    return categoryMap[category] || category;
  };

  return (
    <Link href={`/blogs/${blog.slug}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="group relative w-full h-full min-h-[500px] md:min-h-[600px] overflow-hidden cursor-pointer"
      >
        {/* Blog Image with creative hover effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-all duration-[1s] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.12] group-hover:rotate-[1deg] group-hover:brightness-110">
            {assetUrl ? (
              <Image
                src={assetUrl}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-zinc-600" />
              </div>
            )}
          </div>

          {/* Gradient Overlay - darker on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />

          {/* Noise/Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Top Content - Category & Date (hides on hover) */}
        <div className="absolute top-6 left-6 right-6 z-10 flex items-center gap-3 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px] group-hover:blur-[4px]">
          <span className="text-white text-sm font-louis font-medium">
            {getCategoryDisplay(blog.category)}
          </span>
          <span className="text-zinc-400 text-sm font-louis">
            {formatDate(blog.publicationDate)}
          </span>
        </div>

        {/* Title (hides on hover) */}
        <div className="absolute top-20 left-6 right-6 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px] group-hover:blur-[4px]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-louis font-bold text-white leading-tight">
            {blog.title}
          </h3>
        </div>

        {/* Hover Arrow - Center */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <ArrowUpRight className="w-8 h-8 text-black" />
          </div>
        </div>

        {/* Bottom Plus Icon (hides on hover) */}
        <div className="absolute bottom-6 right-6 z-10 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
          <span className="text-white text-2xl opacity-50">+</span>
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
    <section
      id="blogs-section"
      className="relative bg-[#000000] border-t border-zinc-900"
    >
      {/* Section Header - Same design as Services/Process/Works */}
      <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
        {/* Creative Modern Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-2"
        >
          <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
            <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">Articles</span>
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </motion.div>

        {/* Big Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-survalia text-white leading-[1.05] tracking-tight mb-4"
        >
          Latest<br />
          <span className="text-[#beff01]">Insights.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
        >
          Deep dives into AI, digital transformation, and growth strategies. Practical knowledge to help you stay ahead.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 pb-20 md:pb-32">
        {/* Blogs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#beff01] border-t-transparent"></div>
          </div>
        ) : blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50"
          >
            <BookOpen className="w-16 h-16 text-[#beff01] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              More Content Coming Soon
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We&apos;re crafting some amazing articles right now. Stay tuned for insightful content!
            </p>
          </motion.div>
        ) : (
          <>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id || blog._id || index} blog={blog} index={index} />
              ))}
            </div>

            {/* Bottom Row - Count & All Articles Link */}
            <div className="flex items-center justify-end gap-4">
              <span className="text-zinc-500 font-louis text-sm">
                [{blogs.length}]
              </span>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-white font-louis font-medium hover:text-[#beff01] transition-colors"
              >
                All Articles
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}