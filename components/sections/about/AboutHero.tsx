'use client';

import { motion } from 'framer-motion';
import { Award, Code, Palette, TrendingUp, Heart, Zap, Target, Users } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Meet Bidayalab
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Your Creative Partners
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-20"
          >
            We&apos;re not just another agency that delivers and disappears. We&apos;re here because we genuinely love 
            helping businesses grow online—whether it&apos;s building brands that inspire, websites that convert, or running campaigns that bring real results.
          </motion.p>
        </motion.div>

        {/* Story Section - Modern Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Journey Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-10 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/30">
                  <Heart className="w-7 h-7 text-blue-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Our Journey</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  we started coding back in 2020, and honestly, it felt like finding our calling. 
                  What began as curiosity turned into a passion for building things that people actually use.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Over the years, we&apos;ve worked with <span className="text-[#beff01] font-bold">10+ clients</span> in Marrakech and beyond, 
                  helping them turn their ideas into <span className="text-white font-semibold">real, profitable businesses</span>.
                </p>
              </div>
            </motion.div>

            {/* Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/20 via-green-500/10 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-10 hover:border-[#beff01]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#beff01]/10 flex items-center justify-center mb-6 border border-[#beff01]/30">
                  <Zap className="w-7 h-7 text-[#beff01]" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Our Philosophy</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We don&apos;t just build websites and call it a day. We stick around. 
                  We help with strategy, marketing, design—whatever it takes to make sure you succeed.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Because when you win, We win. <span className="text-[#beff01] font-bold">Simple as that.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center tracking-tight">
            What We are <span className="text-[#beff01]">Really Good At</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                title: "Full-Stack Development",
                desc: "React, Next.js, TypeScript, Node.js",
                gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
                border: "border-blue-500/30",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-400"
              },
              {
                icon: Palette,
                title: "UI/UX Design",
                desc: "Figma, Tailwind CSS, responsive design",
                gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
                border: "border-purple-500/30",
                iconBg: "bg-purple-500/10",
                iconColor: "text-purple-400"
              },
              {
                icon: TrendingUp,
                title: "Digital Marketing",
                desc: "Facebook Ads, Google Ads, SEO",
                gradient: "from-green-500/20 via-green-500/10 to-transparent",
                border: "border-green-500/30",
                iconBg: "bg-green-500/10",
                iconColor: "text-green-400"
              },
              {
                icon: Target,
                title: "Brand Strategy",
                desc: "Logo design, content, social media",
                gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
                border: "border-orange-500/30",
                iconBg: "bg-orange-500/10",
                iconColor: "text-orange-400"
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`relative bg-zinc-900/50 backdrop-blur-sm border ${skill.border} rounded-3xl p-6 transition-all duration-300 group-hover:border-opacity-100`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} rounded-3xl opacity-50`} />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${skill.iconBg} flex items-center justify-center mb-4 border ${skill.border}`}>
                      <skill.icon className={`w-7 h-7 ${skill.iconColor}`} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">{skill.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Work With Me */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center tracking-tight">
            Why Work <span className="text-[#beff01]">With Us?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Users, 
                text: "10+ happy clients who keep coming back",
                gradient: "from-blue-500/10 to-transparent",
                iconColor: "text-blue-400"
              },
              { 
                icon: Zap, 
                text: "Fast turnaround—no waiting weeks for updates",
                gradient: "from-[#beff01]/10 to-transparent",
                iconColor: "text-[#beff01]"
              },
              { 
                icon: Award, 
                text: "Results-driven—We care about your success",
                gradient: "from-purple-500/10 to-transparent",
                iconColor: "text-purple-400"
              },
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-center gap-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl hover:border-zinc-700 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center flex-shrink-0 border border-zinc-700">
                    <reason.icon className={`w-6 h-6 ${reason.iconColor}`} />
                  </div>
                  <span className="text-gray-300 font-medium leading-relaxed">{reason.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#beff01]/20 via-blue-500/10 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-10 hover:border-[#beff01]/30 transition-all">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Look, we&apos;re not here to give you a fancy pitch. We&apos;re a team that loves what we do and we&apos;re here to help your brand grow and succeed. If that sounds good to you, let&apos;s talk.,{" "}
                <span className="text-[#beff01] font-black">let&apos;s chat</span>.
              </p>
            </div>
          </div>
        </motion.div>
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