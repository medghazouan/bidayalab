'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { getBlogs } from '@/lib/data';
import { ArrowUpRight, Loader2, BookOpen } from 'lucide-react';

// Placeholder blog posts shown when the database has no content yet
const PLACEHOLDER_POSTS = [
  {
    _id: 'placeholder-1',
    slug: 'ai-automation-for-smes-complete-guide',
    title: 'AI Automation for SMEs: The Complete 2026 Guide',
    category: 'ai-automation',
    publicationDate: '2026-04-10',
    image: '/assets/images/services/ai-automation.webp',
    excerpt: 'Discover how small and medium businesses in Morocco and beyond are using AI chatbots, workflow automation, and CRM integrations to cut costs by 40% and scale faster than ever.',
  },
  {
    _id: 'placeholder-2',
    slug: 'web-development-trends-morocco-2026',
    title: 'Web Development Trends Shaping Morocco\'s Digital Economy in 2026',
    category: 'web-development',
    publicationDate: '2026-04-05',
    image: '/assets/images/services/web-development.webp',
    excerpt: 'From headless CMS architectures to progressive web apps — the technologies Moroccan businesses need to compete on a global stage.',
  },
  {
    _id: 'placeholder-3',
    slug: 'visual-storytelling-brand-growth',
    title: 'How Visual Storytelling Drives 3x More Engagement for B2B Brands',
    category: 'visual-storytelling',
    publicationDate: '2026-03-28',
    image: '/assets/images/services/visual-storytelling.webp',
    excerpt: 'Why premium video production and brand photography aren\'t a luxury — they\'re the highest-ROI marketing investment for service businesses.',
  },
];

export default function BlogListingClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs — fall back to placeholder content if DB is empty
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await getBlogs('all');
      setPosts(data && data.length > 0 ? data : PLACEHOLDER_POSTS);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Parallax & Scroll Effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-[#beff01] selection:text-black">

      {/* 1. HERO: KINETIC ARCHIVE HEADER */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-20 pt-40 px-4 md:px-12 overflow-hidden border-b border-white/5">
        {/* Background Marquee Logic */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none select-none flex flex-col justify-center">
          <Marquee speed={30} direction="left">ARCHIVE • INTELLIGENCE • INSIGHTS • </Marquee>
          <Marquee speed={20} direction="right">STRATEGY • FUTURE • VISION • </Marquee>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[12vw] md:text-[10vw] font-bold font-louis leading-[0.85] tracking-tighter uppercase text-white mix-blend-difference">
              AI, Web & Digital<br /><span className="text-zinc-700">Transformation Insights</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl font-sans border-l-2 border-[#beff01] pl-6">
              Practical deep-dives into AI automation, digital transformation, and growth strategy for SMEs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE ARCHIVE GRID */}
      <section className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 py-20 min-h-[50vh]">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#beff01] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}

// --- SUB-COMPONENTS ---

function BlogCard({ post, index }: { post: any, index: number }) {

  const getAssetUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("/") || path.startsWith("http")) return path;
    return `/uploads/${path}`;
  };

  const assetUrl = getAssetUrl(post.image);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const getCategoryDisplay = (category: string) => {
    // Map category slugs to display names if needed
    return category.replace('-', ' ');
  };


  return (
    <Link href={`/blogs/${post.slug}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="group relative w-full h-full min-h-[500px] md:min-h-[600px] overflow-hidden cursor-pointer bg-zinc-900"
      >
        {/* Blog Image with creative hover effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-all duration-[1s] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.12] group-hover:rotate-[1deg] group-hover:brightness-110">
            {assetUrl ? (
              <Image
                src={assetUrl}
                alt={post.title}
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
          <span className="text-white text-sm font-louis font-medium uppercase">
            {getCategoryDisplay(post.category)}
          </span>
          <span className="text-zinc-400 text-sm font-louis">
            {formatDate(post.publicationDate)}
          </span>
        </div>

        {/* Title (hides on hover) */}
        <div className="absolute top-20 left-6 right-6 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-20px] group-hover:blur-[4px]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-louis font-bold text-white leading-tight">
            {post.title}
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
  )
}

function Marquee({ children, direction = 'left', speed = 20 }: { children: React.ReactNode, direction?: 'left' | 'right', speed?: number }) {
  return (
    <div className="w-full flex overflow-hidden whitespace-nowrap py-2 opacity-30">
      <motion.div
        className="flex gap-12 text-[8vw] font-black font-louis text-white leading-none uppercase"
        animate={{ x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {/* Triple Repeat for smoothness */}
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  )
}