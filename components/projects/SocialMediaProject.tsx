// components/projects/SocialMediaProject.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Instagram, Heart, MessageCircle, TrendingUp, Users, Calendar, User, Share2, Eye, FileText } from "lucide-react";

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
  platforms?: string[];
  metrics?: {
    followers?: string;
    engagement?: string;
    reach?: string;
    contentPieces?: string;
    storiesPerWeek?: string;
  };
  contentStrategy?: {
    postFrequency?: string;
    contentMix?: {
      educational?: string;
      entertaining?: string;
      promotional?: string;
    };
    bestPostingTimes?: string;
  };
  results?: {
    metric: string;
    value: string;
    description: string;
  }[];
  contentTypes?: string[];
}

export default function SocialMediaProject({ project }: { project: Project }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(190, 255, 1, 0.15) 0%, transparent 50%)',
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 transition-all"
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
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-6">
              <Instagram className="text-pink-400" size={18} />
              <span className="text-pink-400 font-bold text-sm uppercase tracking-wider">Social Media & Content</span>
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
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-pink-500/30 transition-all">
              <User className="text-pink-400 mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1 font-semibold">Client</div>
              <div className="text-white font-bold">{project.client}</div>
            </div>

            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-pink-500/30 transition-all">
              <Calendar className="text-pink-400 mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1 font-semibold">Year</div>
              <div className="text-white font-bold">{project.year}</div>
            </div>

            {project.duration && (
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-pink-500/30 transition-all">
                <TrendingUp className="text-pink-400 mb-3" size={24} />
                <div className="text-sm text-gray-500 mb-1 font-semibold">Duration</div>
                <div className="text-white font-bold">{project.duration}</div>
              </div>
            )}

            {project.platforms && project.platforms.length > 0 && (
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-pink-500/30 transition-all">
                <Instagram className="text-pink-400 mb-3" size={24} />
                <div className="text-sm text-gray-500 mb-1 font-semibold">Platforms</div>
                <div className="text-white font-bold">{project.platforms.join(", ")}</div>
              </div>
            )}
          </motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-video rounded-3xl overflow-hidden mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Metrics Dashboard */}
          {project.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Campaign Results</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {project.metrics.followers && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <Users className="text-pink-400 mb-4" size={28} />
                    <div className="text-3xl font-black text-pink-400 mb-2">
                      {project.metrics.followers}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">Followers Growth</div>
                  </motion.div>
                )}

                {project.metrics.engagement && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <Heart className="text-red-400 mb-4" size={28} />
                    <div className="text-3xl font-black text-red-400 mb-2">
                      {project.metrics.engagement}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">Engagement Rate</div>
                  </motion.div>
                )}

                {project.metrics.reach && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <Eye className="text-purple-400 mb-4" size={28} />
                    <div className="text-3xl font-black text-purple-400 mb-2">
                      {project.metrics.reach}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">Monthly Reach</div>
                  </motion.div>
                )}

                {project.metrics.contentPieces && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <FileText className="text-blue-400 mb-4" size={28} />
                    <div className="text-3xl font-black text-blue-400 mb-2">
                      {project.metrics.contentPieces}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">Content Pieces</div>
                  </motion.div>
                )}

                {project.metrics.storiesPerWeek && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-[#beff01]/10 to-transparent border border-[#beff01]/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <Share2 className="text-[#beff01] mb-4" size={28} />
                    <div className="text-3xl font-black text-[#beff01] mb-2">
                      {project.metrics.storiesPerWeek}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">Stories / Week</div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Content Strategy */}
          {project.contentStrategy && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Content Strategy</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.contentStrategy.postFrequency && (
                  <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-pink-400" />
                      Posting Schedule
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{project.contentStrategy.postFrequency}</p>
                  </div>
                )}
                
                {project.contentStrategy.contentMix && (
                  <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-pink-400" />
                      Content Mix
                    </h3>
                    <div className="space-y-2 text-sm">
                      {project.contentStrategy.contentMix.educational && (
                        <p className="text-gray-400"><span className="text-pink-400 font-semibold">Educational:</span> {project.contentStrategy.contentMix.educational}</p>
                      )}
                      {project.contentStrategy.contentMix.entertaining && (
                        <p className="text-gray-400"><span className="text-pink-400 font-semibold">Entertaining:</span> {project.contentStrategy.contentMix.entertaining}</p>
                      )}
                      {project.contentStrategy.contentMix.promotional && (
                        <p className="text-gray-400"><span className="text-pink-400 font-semibold">Promotional:</span> {project.contentStrategy.contentMix.promotional}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {project.contentStrategy.bestPostingTimes && (
                  <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-pink-400" />
                      Best Times
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{project.contentStrategy.bestPostingTimes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Performance Results */}
          {project.results && project.results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Key Performance Metrics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  >
                    <div className="text-sm text-gray-400 mb-2 font-semibold">{result.metric}</div>
                    <div className="text-5xl font-black text-pink-400 mb-3">{result.value}</div>
                    <p className="text-sm text-gray-500">{result.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Content Types */}
          {project.contentTypes && project.contentTypes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Content Types Created</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.contentTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-start gap-3 bg-zinc-900/50 rounded-xl p-5 border border-zinc-800 backdrop-blur-sm hover:border-pink-500/30 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-pink-500/30">
                      <Heart className="w-3 h-3 text-pink-400" />
                    </div>
                    <span className="text-gray-300 leading-relaxed">{type}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Instagram-Style Gallery */}
          {project.images && project.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Content Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Content ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-4 text-white">
                          <div className="flex items-center gap-2">
                            <Heart size={18} fill="currentColor" className="text-pink-400" />
                            <span className="text-sm font-bold">2.4K</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle size={18} className="text-blue-400" />
                            <span className="text-sm font-bold">156</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technologies/Tools */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Tools & Platforms</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-pink-500/10 border border-pink-500/30 rounded-full px-6 py-3 text-white font-bold cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative text-center bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-3xl p-12 backdrop-blur-sm">
              <Instagram className="text-pink-400 mx-auto mb-6" size={56} />
              <h3 className="text-4xl font-black text-white mb-4">
                Ready to Grow Your Social Media?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's create engaging content that resonates with your audience and drives real business results.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/30"
              >
                <span>Start Your Campaign</span>
                <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}