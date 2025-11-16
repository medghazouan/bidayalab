// components/projects/PaidAdsProject.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Target, DollarSign, TrendingUp, BarChart3, Calendar, User, Clock, Zap, Users, MousePointerClick } from "lucide-react";

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
  budget?: string;
  platforms?: string[];
  targetAudience?: string;
  strategy?: string;
  results?: {
    metric: string;
    value: string;
    change: string;
    description: string;
  }[];
  adCreatives?: {
    type: string;
    platform: string;
    description: string;
  }[];
}

export default function PaidAdsProject({ project }: { project: Project }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(190, 255, 1, 0.15) 0%, transparent 50%)',
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-gray-400 hover:text-green-400 hover:border-green-500/30 transition-all"
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
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
              <Target className="text-green-400" size={18} />
              <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Paid Advertising</span>
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
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-green-500/30 transition-all">
              <User className="text-green-400 mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1 font-semibold">Client</div>
              <div className="text-white font-bold">{project.client}</div>
            </div>

            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-green-500/30 transition-all">
              <Calendar className="text-green-400 mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1 font-semibold">Year</div>
              <div className="text-white font-bold">{project.year}</div>
            </div>

            {project.duration && (
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-green-500/30 transition-all">
                <Clock className="text-green-400 mb-3" size={24} />
                <div className="text-sm text-gray-500 mb-1 font-semibold">Duration</div>
                <div className="text-white font-bold">{project.duration}</div>
              </div>
            )}

            {project.budget && (
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-green-500/30 transition-all">
                <DollarSign className="text-green-400 mb-3" size={24} />
                <div className="text-sm text-gray-500 mb-1 font-semibold">Total Budget</div>
                <div className="text-white font-bold">{project.budget}</div>
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
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-[#beff01]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Platforms */}
          {project.platforms && project.platforms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Ad Platforms</h2>
              <div className="flex flex-wrap gap-4">
                {project.platforms.map((platform, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-br from-green-500/10 to-[#beff01]/10 border border-green-500/30 rounded-full px-6 py-3 text-white font-bold cursor-default"
                  >
                    {platform}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Campaign Strategy */}
          {(project.targetAudience || project.strategy) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Campaign Strategy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.targetAudience && (
                  <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-green-400" size={28} />
                      <h3 className="text-2xl font-black text-white">Target Audience</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{project.targetAudience}</p>
                  </div>
                )}
                
                {project.strategy && (
                  <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="text-green-400" size={28} />
                      <h3 className="text-2xl font-black text-white">Strategy Overview</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{project.strategy}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Campaign Results */}
          {project.results && project.results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-3">
                <BarChart3 className="text-green-400" size={36} />
                Campaign Performance
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  >
                    <div className="text-sm text-gray-400 mb-2 font-semibold">{result.metric}</div>
                    <div className="text-5xl font-black text-green-400 mb-3">
                      {result.value}
                    </div>
                    <div className={`inline-flex items-center gap-2 text-sm font-bold mb-2 ${
                      result.change.startsWith('+') ? 'text-[#beff01]' : 'text-red-400'
                    }`}>
                      <TrendingUp size={16} />
                      {result.change}
                    </div>
                    <p className="text-sm text-gray-500">{result.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Ad Creatives */}
          {project.adCreatives && project.adCreatives.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Ad Creatives Used</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.adCreatives.map((creative, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 backdrop-blur-sm hover:border-green-500/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/30">
                      <MousePointerClick className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{creative.type}</h3>
                    <p className="text-sm text-green-400 mb-3 font-semibold">{creative.platform}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{creative.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Ad Gallery */}
          {project.images && project.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Ad Examples</h2>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-[#beff01]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
                      <Image
                        src={image}
                        alt={`${project.title} - Ad ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tools Used */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-black text-white mb-8">Tools & Platforms Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 text-white font-bold cursor-default"
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
            transition={{ delay: 1.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-[#beff01]/20 to-green-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative text-center bg-gradient-to-br from-green-500/10 to-[#beff01]/10 border border-green-500/20 rounded-3xl p-12 backdrop-blur-sm">
              <Target className="text-green-400 mx-auto mb-6" size={56} />
              <h3 className="text-4xl font-black text-white mb-4">
                Ready to Scale Your Business?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let&apos;s create high-performing ad campaigns that drive conversions and maximize your return on investment.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
              >
                <span>Launch Your Campaign</span>
                <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}