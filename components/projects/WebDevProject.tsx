// components/projects/WebDevProject.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Zap, Code, Smartphone, Globe, Layers, CheckCircle2 } from "lucide-react";

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
  year: string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenge?: string;
  solution?: string;
  results?: {
    metric: string;
    value: string;
    description: string;
  }[];
}

export default function WebDevProject({ project }: { project: Project }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%'
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Projects</span>
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Code className="text-blue-400" size={18} />
              <span className="text-blue-400 font-bold text-sm uppercase tracking-wider">Web Development</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              {project.description}
            </p>
          </motion.div>

          {/* Project Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-blue-500/30 transition-all">
              <User className="text-blue-400 mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1 font-semibold">Client</div>
              <div className="text-white font-bold">{project.client}</div>
            </div>

            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-blue-500/30 transition-all">
              <Calendar className="text-blue-400 mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1 font-semibold">Year</div>
              <div className="text-white font-bold">{project.year}</div>
            </div>

            {project.duration && (
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-blue-500/30 transition-all">
                <Zap className="text-blue-400 mb-3" size={24} />
                <div className="text-sm text-gray-500 mb-1 font-semibold">Duration</div>
                <div className="text-white font-bold">{project.duration}</div>
              </div>
            )}

            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm flex items-center justify-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span className="font-bold">Live</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                  <Github size={20} />
                  <span className="font-bold">Code</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-video rounded-3xl overflow-hidden mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {project.challenge && (
                <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Layers className="text-red-400" size={28} />
                    The Challenge
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
                </div>
              )}
              
              {project.solution && (
                <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <CheckCircle2 className="text-green-400" size={28} />
                    The Solution
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Results/Metrics */}
          {project.results && project.results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Project Results</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  >
                    <div className="text-sm text-gray-400 mb-2 font-semibold">{result.metric}</div>
                    <div className="text-5xl font-black text-blue-400 mb-3">{result.value}</div>
                    <p className="text-sm text-gray-500">{result.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 text-white font-bold cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-start gap-4 bg-zinc-900/50 rounded-xl p-5 border border-zinc-800 backdrop-blur-sm hover:border-blue-500/30 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/30">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-gray-300 leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Images Gallery */}
          {project.images && project.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Project Gallery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-video rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
                      <Image
                        src={image}
                        alt={`${project.title} - Screenshot ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-12 backdrop-blur-sm">
              <Globe className="text-blue-400 mx-auto mb-6" size={56} />
              <h3 className="text-4xl font-black text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let&apos;s build something amazing together. Get in touch to discuss how I can help bring your vision to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                <span>Get In Touch</span>
                <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}