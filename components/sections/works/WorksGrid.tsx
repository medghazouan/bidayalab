'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Briefcase, Loader2 } from 'lucide-react';
import ProjectCard from '@/components/cards/ProjectCard';

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

export default function WorksGrid() {

  // Use React Query for better caching and request deduplication
  const { data, isLoading, error: queryError } = useQuery<{ success: boolean; projects: Project[] }>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
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
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              Our works
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-black text-white mb-2 tracking-tight leading-none flex flex-col items-center"
          >
            <span className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap block">Our Latest</span>
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-[9vw] sm:text-[8vw] md:text-6xl lg:text-8xl xl:text-9xl leading-[0.8] whitespace-nowrap block mt-2">
              Digital Case Studies
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

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={{
                  id: project._id,
                  title: project.title,
                  category: project.category,
                  image: project.image,
                  slug: project.slug
                }}
                index={index}
              />
            ))}
          </div>
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