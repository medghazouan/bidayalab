// components/sections/category/PaidAdsCategoryPage.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Target,
  DollarSign,
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  Clock,
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
  platform?: string[];
  budget?: string;
  duration?: string;
  results?: Array<{
    metric: string;
    value: string;
    change: string;
  }>;
  [key: string]: unknown;
}

interface Props {
  projects: Project[];
}

export default function PaidAdsCategoryPage({ projects }: Props) {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-6 py-3 mb-6"
            >
              <Target className="text-green-500" size={20} />
              <span className="text-white font-bold">PAID ADVERTISING</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Data-Driven
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Performance Marketing
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              ROI-focused advertising campaigns that deliver measurable results.
              From Google Ads to Meta campaigns, maximizing every dollar spent.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { label: "Campaigns", value: `${projects.length}+`, icon: Target },
                { label: "Avg. ROAS", value: "4.2x", icon: TrendingUp },
                { label: "Ad Spend", value: "$250K+", icon: DollarSign },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <stat.icon className="text-green-500 mx-auto mb-2" size={24} />
                  <div className="text-3xl font-bold text-green-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
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
                icon: Target,
                title: "Audience Targeting",
                desc: "Precision targeting for maximum ROI",
              },
              {
                icon: BarChart3,
                title: "Campaign Optimization",
                desc: "Continuous A/B testing & refinement",
              },
              {
                icon: DollarSign,
                title: "Budget Management",
                desc: "Maximizing every ad dollar",
              },
              {
                icon: Award,
                title: "Performance Reporting",
                desc: "Transparent metrics & insights",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="text-green-500" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Grid - Dashboard Style */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <Sparkles className="text-green-500" size={32} />
              Campaign Results
            </motion.h2>

            <div className="space-y-12">
              {projects.map((project, index: number) => (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl overflow-hidden border border-white/10 hover:border-green-500/30 transition-all duration-500"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Target className="text-green-500" size={24} />
                          <span className="text-green-500 font-bold text-sm">
                            {project.year}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400 text-sm">
                            {project.client}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-green-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed max-w-3xl">
                          {project.description}
                        </p>
                      </div>

                      {/* Campaign Badge */}
                      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-3">
                        <div className="text-sm text-gray-400 mb-1">Total Budget</div>
                        <div className="text-2xl font-bold text-green-500">
                          {project.budget}
                        </div>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {/* Platforms */}
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="text-blue-500" size={20} />
                          <span className="text-gray-400 text-sm font-bold">PLATFORMS</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.platform?.map((p, i) => (
                            <span
                              key={i}
                              className="bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1 text-xs text-blue-400 font-bold"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="text-purple-500" size={20} />
                          <span className="text-gray-400 text-sm font-bold">DURATION</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {project.duration}
                        </div>
                      </div>

                      {/* Campaign Image Preview */}
                      <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <Image
                          src={project.image || '/assets/projects/work1.jpg'}
                          alt={project.title || 'Project'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Results Dashboard */}
                    {project.results && project.results.length > 0 && (
                      <div className="bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <BarChart3 className="text-green-500" size={28} />
                          <h4 className="text-2xl font-bold text-white">
                            Campaign Performance
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          {(project.results || []).map((result, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                            >
                              <div className="text-sm text-gray-400 mb-2">
                                {result.metric}
                              </div>
                              <div className="text-4xl font-bold text-white mb-2">
                                {result.value}
                              </div>
                              <div className={`inline-flex items-center gap-1 text-sm font-bold ${
                                result.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                              }`}>
                                <TrendingUp size={16} />
                                {result.change}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link
                      href={`/works/${project.slug}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
                    >
                      View Full Campaign Details
                      <ArrowRight size={20} />
                    </Link>
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
            className="relative bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }} />
            </div>

            <div className="relative z-10">
              <Target className="text-white mx-auto mb-6" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Scale Your Business?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Let&apos;s create high-performing ad campaigns that drive conversions and
                maximize your return on investment.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-green-500 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              >
                Launch Your Campaign
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
