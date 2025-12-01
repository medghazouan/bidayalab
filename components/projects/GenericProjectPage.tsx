// components/projects/GenericProjectPage.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Code2, Workflow, Palette, CheckCircle } from "lucide-react";

// Flexible interface that accepts any MongoDB document
interface Project {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  description?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  client?: string;
  year?: string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  featured?: boolean;
  [key: string]: unknown; // Accept any additional fields
}

interface Props {
  project: Project;
}

export default function GenericProjectPage({ project }: Props) {
  // Category config - using categorySlug with fallback
  const categoryConfig = {
    'digital-solutions': {
      label: 'Digital Solutions',
      icon: Code2,
    },
    'smart-automation': {
      label: 'Smart Automation',
      icon: Workflow,
    },
    'creative-branding': {
      label: 'Creative Branding',
      icon: Palette,
    },
  };

  // Get category config with fallback
  const categorySlug = project.categorySlug || 'digital-solutions';
  const config = categoryConfig[categorySlug as keyof typeof categoryConfig] || categoryConfig['digital-solutions'];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back button */}
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#beff01] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-6"
          >
            <Icon className="w-4 h-4 text-[#beff01]" />
            <span className="text-sm font-medium">{config.label}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          {project.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mb-8"
            >
              {project.description}
            </motion.p>
          )}

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8"
          >
            {project.client && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.duration}</span>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#beff01] text-black font-bold rounded-full hover:scale-105 transition-transform"
              >
                View Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-full hover:border-[#beff01]/30 transition-all"
              >
                View Code
                <Github className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {project.image && (
        <section className="px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-gray-300 font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
                >
                  <CheckCircle className="w-5 h-5 text-[#beff01] flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-80 rounded-2xl overflow-hidden border border-zinc-800"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-4">Interested in a Similar Project?</h2>
          <p className="text-gray-400 mb-8">
            Lets discuss how we can bring your vision to life
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#beff01] text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Get in Touch
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
