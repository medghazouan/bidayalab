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
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Creative Section Header - Max Right Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
              Our Portfolio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tight"
            >
              LATEST<br />
              <span className="text-[#beff01]">PROJECTS</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:text-right lg:pb-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 leading-relaxed ml-auto"
            >
              Explore our collection of award-winning digital experiences. Each project is a testament to our obsession with <span className="text-white font-medium">quality and performance</span>.
            </motion.p>
          </div>
        </div>

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