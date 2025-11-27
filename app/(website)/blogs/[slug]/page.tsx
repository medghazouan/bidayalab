'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, BookOpen, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  publicationDate: string;
  text: string;
  excerpt?: string;
}

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, error } = useQuery<{ success: boolean; blog: Blog }>({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      return response.json();
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const blog = data?.blog;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || blog.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <div 
            className="absolute inset-0 opacity-30 animate-gradient-mesh"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-3xl animate-orb-1" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-orb-2" />
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-zinc-800 rounded w-1/4" />
            <div className="h-12 bg-zinc-800 rounded w-3/4" />
            <div className="h-96 bg-zinc-800 rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-zinc-800 rounded" />
              <div className="h-4 bg-zinc-800 rounded" />
              <div className="h-4 bg-zinc-800 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <div 
            className="absolute inset-0 opacity-30 animate-gradient-mesh"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-3xl animate-orb-1" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-orb-2" />
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-400 mb-8">
              The article you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#beff01] text-black font-semibold hover:bg-[#a8d601] transition-all duration-300 shadow-[0_0_20px_rgba(190,255,1,0.3)]"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Animated Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
        {/* Static Gradient Mesh */}
        <div 
          className="absolute inset-0 opacity-30 animate-gradient-mesh"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-3xl animate-orb-1" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-orb-2" style={{ willChange: 'transform' }} />

        {/* Scanning line */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />

        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Main Content */}
      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#beff01] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Blogs</span>
        </Link>

        {/* Blog Header */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category and Date */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#beff01]/10 border border-[#beff01]/20 text-[#beff01] text-sm font-medium backdrop-blur-sm">
              <BookOpen className="w-4 h-4" />
              {blog.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.publicationDate)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-gray-400 leading-relaxed">{blog.excerpt}</p>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-gray-300 hover:text-[#beff01] hover:border-[#beff01]/50 transition-all duration-300 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 border border-zinc-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Blog Content */}
        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="text-gray-300 leading-relaxed space-y-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-12 [&>h1]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-gray-300 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>a]:text-[#beff01] [&>a]:hover:underline [&>blockquote]:border-l-4 [&>blockquote]:border-[#beff01] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>code]:bg-zinc-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-[#beff01] [&>pre]:bg-zinc-900 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: blog.text }}
          />
        </motion.div>

        {/* Divider */}
        <div className="my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </div>

        {/* Back to Blogs CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#beff01] text-black font-semibold hover:bg-[#a8d601] transition-all duration-300 group shadow-[0_0_20px_rgba(190,255,1,0.3)]"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Explore More Articles</span>
          </Link>
        </motion.div>
      </article>

      <style jsx global>{`
        @keyframes gradient-mesh {
          0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
          50% { background-position: 100% 100%, 0% 0%, 100% 0%; }
        }
        
        @keyframes orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.2); }
        }
        
        @keyframes orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.3); }
        }
        
        @keyframes scan-line {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(200vh); }
        }
        
        .animate-gradient-mesh {
          animation: gradient-mesh 20s ease-in-out infinite;
        }
        
        .animate-orb-1 {
          animation: orb-1 15s ease-in-out infinite;
        }
        
        .animate-orb-2 {
          animation: orb-2 18s ease-in-out infinite 2s;
        }
        
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>
    </div>
  );
}