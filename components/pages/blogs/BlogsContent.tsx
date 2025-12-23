'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, BookOpen, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function BlogsContent() {


    const { data, isLoading, error: queryError } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const response = await fetch('/api/blogs');
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const blogs: Blog[] = (data?.blogs || []) as Blog[];

    const loading = isLoading;
    const error = queryError ? 'Error loading articles' : '';

    const formatDate = (dateString: string | number | Date): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Optimized Animated Background */}
            <div className="fixed inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
                <div
                    className="absolute inset-0 opacity-30 animate-gradient-mesh"
                    style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(190, 255, 1, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-2xl animate-orb-1" style={{ willChange: 'transform' }} />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-2xl animate-orb-2" style={{ willChange: 'transform' }} />

                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#beff01]/30 to-transparent animate-scan-line" />

                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat'
                    }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 pt-24">
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
                                    Blog & Insights
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
                            >
                                Stories That
                                <br />
                                <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                    Inspire & Educate
                                </span>
                            </motion.h1>


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

                        {/* Blogs Grid */}
                        {!loading && !error && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="all-blogs"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                                >
                                    {blogs.map((blog: Blog, index: number) => (
                                        <BlogCard
                                            key={blog.id}
                                            blog={blog}
                                            index={index}
                                            formatDate={formatDate}
                                        />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Empty State */}
                        {!loading && !error && blogs.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="py-32 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-10 h-10 text-gray-600" />
                                </div>
                                <p className="text-2xl text-gray-500 font-medium">
                                    No articles found in this category yet.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </section>
            </main>

            <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
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
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
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

interface BlogCardProps {
    blog: Blog;
    index: number;
    formatDate: (dateString: string | number | Date) => string;
}

function BlogCard({ blog, index, formatDate }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/blogs/${blog.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800/50 cursor-pointer hover:border-[#beff01]/50 transition-all duration-300"
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
                    className="absolute inset-0"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src={blog.image.startsWith('/') || blog.image.startsWith('http') ? blog.image : `/uploads/blogs/${blog.image}`}
                        alt={blog.title}
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

                {/* Category and Date Badges - Fixed overlapping on mobile */}
                <div className="absolute top-0 left-0 right-0 z-10 p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        {/* Category Badge */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            <span className="inline-flex items-center gap-1.5 bg-[#beff01] text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xl shadow-[#beff01]/30">
                                <BookOpen className="w-3 h-3" />
                                {blog.category}
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Blog Title & Excerpt */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-10"
                >
                    <h3 className="text-xl sm:text-3xl font-black text-white mb-2 group-hover:text-[#beff01] transition-colors duration-300 tracking-tight">
                        {blog.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.publicationDate)}</span>
                    </div>

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
