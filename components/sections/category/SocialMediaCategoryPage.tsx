// components/sections/category/SocialMediaCategoryPage.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import {
  Instagram,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react";

interface Props {
  projects: Project[];
}

export default function SocialMediaCategoryPage({ projects }: Props) {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-6 py-3 mb-6"
            >
              <Instagram className="text-pink-500" size={20} />
              <span className="text-white font-bold">SOCIAL MEDIA & CONTENT</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Growing Brands
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent">
                Through Content
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Strategic content creation and community management that drives real
              engagement. Building authentic connections that turn followers into
              customers.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { label: "Campaigns", value: `${projects.length}+`, icon: Target },
                { label: "Total Reach", value: "500K+", icon: Users },
                { label: "Avg. Engagement", value: "8.5%", icon: TrendingUp },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <stat.icon className="text-pink-500 mx-auto mb-2" size={24} />
                  <div className="text-3xl font-bold text-pink-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6 mb-20"
          >
            {[
              {
                icon: Instagram,
                title: "Content Creation",
                desc: "Eye-catching posts & stories",
              },
              {
                icon: Users,
                title: "Community Management",
                desc: "Engaging with your audience",
              },
              {
                icon: TrendingUp,
                title: "Growth Strategy",
                desc: "Organic follower growth",
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                desc: "Data-driven decisions",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="text-pink-500" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Grid - Instagram Style */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <Sparkles className="text-pink-500" size={32} />
              Featured Campaigns
            </motion.h2>

            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  {/* Project Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                        <Instagram className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-pink-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {project.client} • {project.year}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Dashboard */}
                  {project.metrics && (
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 rounded-2xl p-6"
                      >
                        <Users className="text-pink-500 mb-3" size={28} />
                        <div className="text-3xl font-bold text-white mb-1">
                          {project.metrics.followers}
                        </div>
                        <div className="text-sm text-gray-400">Followers Growth</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6"
                      >
                        <Heart className="text-red-500 mb-3" size={28} />
                        <div className="text-3xl font-bold text-white mb-1">
                          {project.metrics.engagement}
                        </div>
                        <div className="text-sm text-gray-400">Engagement Rate</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6"
                      >
                        <TrendingUp className="text-purple-500 mb-3" size={28} />
                        <div className="text-3xl font-bold text-white mb-1">
                          {project.metrics.reach}
                        </div>
                        <div className="text-sm text-gray-400">Monthly Reach</div>
                      </motion.div>
                    </div>
                  )}

                  {/* Instagram-Style Grid */}
                  {project.samplePosts && project.samplePosts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {project.samplePosts.map((post, postIndex) => (
                        <motion.div
                          key={postIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: postIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                        >
                          <Image
                            src={post.image}
                            alt={post.caption}
                            fill
                            className="object-cover"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="flex items-center gap-4 text-white">
                                <div className="flex items-center gap-1">
                                  <Heart size={18} fill="currentColor" />
                                  <span className="text-sm font-bold">
                                    {post.likes}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle size={18} />
                                  <span className="text-sm font-bold">
                                    {post.engagement}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Platforms Tags */}
                  {project.platforms && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.platforms.map((platform, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-4 py-2 text-sm text-pink-400 font-bold"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Case Study Button */}
                  <Link
                    href={`/works/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
                  >
                    View Full Case Study
                    <ArrowRight size={20} />
                  </Link>

                  {/* Divider */}
                  {index < projects.length - 1 && (
                    <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}
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
            className="relative bg-gradient-to-br from-pink-500 via-red-500 to-purple-500 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }} />
            </div>

            <div className="relative z-10">
              <Instagram className="text-white mx-auto mb-6" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Grow Your Social Media?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Let's create engaging content that resonates with your audience and
                drives real business results.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-pink-500 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              >
                Start Your Campaign
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
