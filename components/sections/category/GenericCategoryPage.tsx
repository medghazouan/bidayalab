// components/sections/category/GenericCategoryPage.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Code2, Workflow, Palette, ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";

interface Service {
  name: string;
  desc: string;
}

interface Category {
  slug: string;
  label: string;
  icon: string;
  description: string;
  services?: Service[];
}

interface Project {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  client?: string;
  year?: string;
  description?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  [key: string]: unknown;
}

interface Props {
  category: Category;
  projects: Project[];
}

export default function GenericCategoryPage({ category, projects }: Props) {
  // Map icon names to components
  const iconMap = {
    Code2: Code2,
    Workflow: Workflow,
    Palette: Palette,
  };

  const Icon = iconMap[category.icon as keyof typeof iconMap] || Code2;

  // Category-specific color schemes
  const colorSchemes = {
    'digital-solutions': {
      gradient: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20',
      accent: 'text-blue-400',
      hover: 'hover:border-blue-400/30',
      glow: 'shadow-blue-500/20',
    },
    'smart-automation': {
      gradient: 'from-green-500/20 via-emerald-500/20 to-green-500/20',
      accent: 'text-green-400',
      hover: 'hover:border-green-400/30',
      glow: 'shadow-green-500/20',
    },
    'creative-branding': {
      gradient: 'from-purple-500/20 via-pink-500/20 to-purple-500/20',
      accent: 'text-purple-400',
      hover: 'hover:border-purple-400/30',
      glow: 'shadow-purple-500/20',
    },
  };

  const colors = colorSchemes[category.slug as keyof typeof colorSchemes] || colorSchemes['digital-solutions'];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${colors.gradient} mb-8 shadow-2xl ${colors.glow}`}>
            <Icon className={`w-12 h-12 ${colors.accent}`} />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {category.label}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            {category.description}
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {projects.length} Projects
            </span>
            <span>•</span>
            <span>Professional Solutions</span>
          </div>
        </motion.div>

        {/* Services Overview (if provided) */}
        {category.services && category.services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {category.services.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-zinc-900 border border-zinc-800 ${colors.hover} transition-all`}
              >
                <h3 className={`text-xl font-bold mb-2 ${colors.accent}`}>
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/works/${project.slug}`}>
                <div className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 ${colors.hover} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${colors.glow}`}>
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || '/placeholder.jpg'}
                      alt={project.title || 'Project'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60" />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#beff01] text-black text-xs font-bold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                      {project.client && <span>{project.client}</span>}
                      {project.client && project.year && <span>•</span>}
                      {project.year && <span>{project.year}</span>}
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#beff01] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-gray-300 border border-zinc-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-gray-500">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2 text-[#beff01] group-hover:gap-3 transition-all">
                        View Project <ArrowRight className="w-4 h-4" />
                      </span>
                      {project.liveUrl && (
                        <ExternalLink className="w-4 h-4 text-gray-500 hover:text-gray-300 transition-colors" />
                      )}
                      {project.githubUrl && (
                        <Github className="w-4 h-4 text-gray-500 hover:text-gray-300 transition-colors" />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold mb-3">Coming Soon</h3>
            <p className="text-gray-400">
              We&apos;re crafting amazing {category.label.toLowerCase()} projects. Check back soon!
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 md:p-12 rounded-3xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Let&apos;s collaborate on your next {category.label.toLowerCase()} project and bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#beff01] text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
