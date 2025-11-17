// components/sections/category/WebDevCategoryPage.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Smartphone,
  Zap,
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
} from "lucide-react";

interface Project {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  categorySlug?: string;
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
  projects: Project[];
}

export default function WebDevCategoryPage({ projects }: Props) {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Category Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3 mb-6"
            >
              <Code2 className="text-red-500" size={20} />
              <span className="text-white font-bold">WEB DEVELOPMENT</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Crafting Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Modern, scalable web applications built with cutting-edge
              technologies. From e-commerce platforms to SaaS solutions,
              delivering exceptional user experiences.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { label: "Projects", value: `${projects.length}+` },
                { label: "Technologies", value: "15+" },
                { label: "Clients", value: "20+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="text-3xl font-bold text-red-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-20"
          >
            {[
              {
                icon: Smartphone,
                title: "Responsive Design",
                desc: "Perfect on every device",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized performance",
              },
              {
                icon: Layers,
                title: "Scalable Architecture",
                desc: "Built to grow",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="text-red-500" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <Sparkles className="text-red-500" size={32} />
              Featured Projects
            </motion.h2>

            <div className="grid gap-8">
              {projects.map((project, index: number) => (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Project Image */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <Image
                          src={project.image || '/assets/projects/work1.jpg'}
                          alt={project.title || 'Project'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Live Preview Badge */}
                      {project.liveUrl && (
                        <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-green-400 text-sm font-bold">
                            LIVE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-red-500 font-bold text-sm">
                            {project.year}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400 text-sm">
                            {project.client}
                          </span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(project.technologies || []).map((tech, i) => (
                            <span
                              key={i}
                              className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Features Preview */}
                        {project.features && (
                          <div className="space-y-2 mb-6">
                            {project.features.slice(0, 3).map((feature, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-gray-400"
                              >
                                <div className="w-1 h-1 bg-red-500 rounded-full" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/works/${project.slug}`}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
                        >
                          View Project
                          <ArrowRight size={18} />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-6 py-3 rounded-full font-bold transition-all duration-300"
                          >
                            Live Demo
                            <ExternalLink size={18} />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-6 py-3 rounded-full font-bold transition-all duration-300"
                          >
                            <Github size={18} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Build Your Next Project?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Let&apos;s create something amazing together. From concept to launch,
                I&apos;ll bring your vision to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-500 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              >
                Start Your Project
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
