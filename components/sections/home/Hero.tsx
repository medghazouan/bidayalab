'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight,  Monitor, TrendingUp, Palette } from 'lucide-react';

export default function Hero() {
  const scrollToWorks = () => {
    const worksSection = document.getElementById('works-section');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative pt-20 md:pt-32 pb-10 md:pb-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header - Same as Services */}
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
            YOUR DIGITAL GROWTH PARTNER IN MOROCCO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Your Business
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Deserves Better
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-12"
          >
            We&apos;re Bidayalab , and we help ambitious business owners like you turn their online presence into a 
             powerful growth engine.
            No fluff, no empty promises—just real results that move your business forward.
          </motion.p>

          
          

          {/* What I Actually Do - Service Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider font-bold">What We Can Do For You</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  icon: Monitor, 
                  title: "Websites That Sell", 
                  desc: "Fast-loading, mobile-perfect sites that turn browsers into buyers. Built with React & Next.js",
                  gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
                  border: "border-blue-500/30",
                  glow: "hover:shadow-blue-500/20",
                  iconColor: "text-blue-400",
                  iconBg: "bg-blue-500/10"
                },
                { 
                  icon: TrendingUp, 
                  title: "Marketing That Works", 
                  desc: "Strategic campaigns on Facebook & Google that bring real customers—not just clicks",
                  gradient: "from-green-500/20 via-green-500/10 to-transparent",
                  border: "border-green-500/30",
                  glow: "hover:shadow-green-500/20",
                  iconColor: "text-green-400",
                  iconBg: "bg-green-500/10"
                },
                { 
                  icon: Palette, 
                  title: "Brands That Stand Out", 
                  desc: "Visual identity that makes people remember you and choose you over competitors",
                  gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
                  border: "border-purple-500/30",
                  glow: "hover:shadow-purple-500/20",
                  iconColor: "text-purple-400",
                  iconBg: "bg-purple-500/10"
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className={`relative bg-gradient-to-br ${service.gradient} border ${service.border} rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 ${service.glow} hover:shadow-2xl group`}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${service.iconBg} border ${service.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className={`w-7 h-7 ${service.iconColor}`} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{service.desc}</p>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/services#pricing-section"
                className="group relative inline-flex items-center justify-center gap-3 bg-[#beff01] text-black font-black text-lg px-12 py-6 rounded-full hover:bg-[#a8e600] transition-all overflow-hidden shadow-2xl shadow-[#beff01]/30"
              >
                
                <span className="relative z-10">Let&apos;s Talk Pricing</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#d4ff4d] to-[#beff01]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={scrollToWorks}
                className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#beff01] text-[#beff01] font-black text-lg px-12 py-6 rounded-full hover:bg-[#beff01]/10 transition-all backdrop-blur-xl shadow-lg shadow-[#beff01]/10 hover:shadow-[#beff01]/20"
              >
                <span>See Real Results</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 rounded-full px-6 py-3 backdrop-blur-xl">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#beff01] to-green-500 border-2 border-black flex items-center justify-center"
                  />
                ))}
              </div>
              <span className="text-gray-300">
                <span className="text-[#beff01] font-bold">20+ businesses</span> already growing with us
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              
              <span>Based in Marrakech, serving clients worldwide</span>
            </div>
          </motion.div>

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