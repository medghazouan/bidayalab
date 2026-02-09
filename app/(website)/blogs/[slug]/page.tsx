'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { getBlogBySlug, getRelatedBlogs } from '@/lib/data';
import { ArrowLeft, ArrowUpRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRelatedImage, setHoveredRelatedImage] = useState<string | null>(null);

  // Reading Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data } = await getBlogBySlug(slug);
      if (data) {
        setPost(data);
        const related = await getRelatedBlogs(slug, data.category, 5);
        if (related.success) setRelatedPosts(related.data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#beff01]"><div className="animate-spin text-4xl">●</div></div>;
  if (!post) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-louis text-2xl">404 - Archive Not Found</div>;

  return (
    <article className="bg-[#050505] min-h-screen text-zinc-300 selection:bg-[#beff01] selection:text-black">

      {/* GLOBAL NOISE OVERLAY (Matches Home Page) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 1. PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#beff01] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* 2. HERO - ALIGNMENT FIX */}
      {/* Using max-w-[1920px] and px-4 md:px-8 to match Navbar exactly */}
      <div className="relative min-h-[80vh] w-full flex items-end pb-20 pt-40">
        <Image
          src={
            post.image
              ? (post.image.startsWith('http') || post.image.startsWith('/')
                ? post.image
                : `/uploads/${post.image}`)
              : '/images/placeholder.jpg'
          }
          alt={post.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />

        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-2 bg-[#beff01] text-black text-sm font-bold font-louis uppercase tracking-widest border border-[#beff01]">
                {post.category}
              </span>
              <span className="text-zinc-300 font-louis text-sm uppercase tracking-widest border border-white/20 px-4 py-2 bg-black/50 backdrop-blur">
                {new Date(post.publicationDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black font-louis text-white uppercase leading-[0.85] tracking-tighter mb-10 shadow-black drop-shadow-2xl">
              {post.title}
            </h1>

            <Link href="/blogs" className="group inline-flex items-center gap-2 text-sm font-bold font-louis uppercase tracking-widest text-[#beff01] hover:text-black transition-colors bg-black/50 px-6 py-3 backdrop-blur border border-[#beff01] hover:bg-[#beff01]">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Archive
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 3. MAIN LAYOUT GRID (Sidebar + Content + Related) */}
      {/* Using max-w-[1920px] and px-4 md:px-8 to match Navbar alignment on wide screens */}
      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 py-20 lg:py-32 grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-24">

        {/* STICKY SOCIAL SIDEBAR - Tracks for BOTH Article and Related Section */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit z-30">
          <SocialButton icon={<Facebook size={18} />} />
          <SocialButton icon={<Twitter size={18} />} />
          <SocialButton icon={<Linkedin size={18} />} />
          <div className="w-[1px] h-12 bg-white/10 mx-auto" />
          <SocialButton icon={<Share2 size={18} />} />
        </aside>

        {/* CONTENT COLUMN - contains Article AND Related Section */}
        {/* Removed max-w-5xl to allow full width (matching navbar right padding) */}
        <div className="w-full">

          {/* -- ARTICLE CONTENT -- */}
          <div className="mb-12">
            {post.excerpt && (
              <p className="text-2xl md:text-3xl font-louis font-bold text-white leading-tight mb-16 border-l-4 border-[#beff01] pl-6 tracking-wide">
                {post.excerpt}
              </p>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: post.text }}
              className="
                                prose prose-xl prose-invert max-w-none text-zinc-300 font-sans leading-loose
                                first-letter:float-left first-letter:text-7xl first-letter:font-bold first-letter:font-louis first-letter:text-[#beff01] first-letter:mr-3 first-letter:mt-2
                                prose-headings:font-louis prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
                                prose-h2:text-5xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
                                prose-h3:text-3xl prose-h3:text-[#beff01] prose-h3:mt-12
                                prose-p:text-lg prose-p:text-zinc-400 prose-p:mb-8 prose-p:font-normal
                                prose-blockquote:border-l-[#beff01] prose-blockquote:text-3xl prose-blockquote:font-louis prose-blockquote:font-bold prose-blockquote:uppercase prose-blockquote:tracking-tight prose-blockquote:text-white prose-blockquote:py-8 prose-blockquote:px-8 prose-blockquote:my-16 prose-blockquote:bg-zinc-900/50
                                prose-a:text-[#beff01] prose-a:font-bold prose-a:no-underline prose-a:border-b prose-a:border-[#beff01]/30 hover:prose-a:border-[#beff01]
                                prose-img:rounded-none prose-img:border prose-img:border-white/10 prose-img:w-full prose-img:my-12
                                prose-ul:list-square prose-li:marker:text-[#beff01]
                            "
            />

            {/* Article Footer - RESTORED & TIGHTENED SPACING */}
            <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10">
              <div className="lg:hidden flex gap-4 w-full justify-start"> {/* Aligned to start (left) */}
                <SocialButton icon={<Facebook size={20} />} />
                <SocialButton icon={<Twitter size={20} />} />
                <SocialButton icon={<Linkedin size={20} />} />
                <SocialButton icon={<Share2 size={20} />} />
              </div>
            </div>
          </div>


          {/* -- RELATED INTELLIGENCE -- */}
          {relatedPosts.length > 0 && (
            <section className="relative py-12 pb-0"> {/* Reduced bottom padding to 0 for footer gap */}
              <div className="relative z-10 w-full">
                {/* STANDARD HOME-STYLE HEADER */}
                <div className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4"
                  >
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
                      <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">
                        Discover More
                      </span>
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </motion.div>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-louis text-white uppercase tracking-tight leading-[0.9]">
                    Related <span className="text-zinc-600">Intelligence</span>
                  </h2>
                </div>

                <div className="flex flex-col">
                  {relatedPosts.map((relPost, i) => (
                    <Link
                      key={relPost._id}
                      href={`/blogs/${relPost.slug}`}
                      className="group relative flex flex-col md:flex-row md:items-center py-8 border-b border-white/10 hover:border-[#beff01] transition-colors duration-300 gap-6 md:gap-20 overflow-hidden px-4 md:px-8" /* Added Padding here */
                    // Removed: onMouseEnter={() => setHoveredRelatedImage(relPost.image)}
                    // Removed: onMouseLeave={() => setHoveredRelatedImage(null)}
                    >
                      {/* Local Hover Background Image */}
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                        <Image
                          src={
                            relPost.image
                              ? (relPost.image.startsWith('http') || relPost.image.startsWith('/')
                                ? relPost.image
                                : `/uploads/${relPost.image}`)
                              : '/images/placeholder.jpg'
                          }
                          alt=""
                          fill
                          className="object-cover blur-sm"
                        />
                      </div>

                      {/* Date Col */}
                      <div className="relative z-10 w-48 shrink-0 text-zinc-500 font-louis font-bold uppercase tracking-widest text-sm group-hover:text-[#beff01] transition-colors">
                        {new Date(relPost.publicationDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>

                      {/* Title Col */}
                      <div className="relative z-10 grow">
                        <h3 className="text-2xl md:text-3xl font-black font-louis text-white leading-tight uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                          {relPost.title}
                        </h3>
                      </div>

                      {/* Arrow Col */}
                      <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:-translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight size={28} className="text-[#beff01]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>

    </article>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#beff01] hover:border-[#beff01] transition-all bg-black hover:bg-[#beff01]/10">
      {icon}
    </button>
  )
}