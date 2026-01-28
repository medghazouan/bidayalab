'use client';

import Link from 'next/link';
import { ArrowRight} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="relative pt-18 md:pt-32 pb-10 md:pb-16 overflow-hidden">
      {/* Divider Above Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-16">
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#beff01]/50 to-transparent"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header - Same as Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              Ready When You Are
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Let&apos;s Create
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Something Amazing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-12"
          >
            Look, I know taking the first step can feel risky. You&apos;re wondering: 
            &quot;Will this actually work?&quot; Here&apos;s what I can promise you—
             I&apos;ll treat your business like it&apos;s my own. 
            No cutting corners, no cookie-cutter solutions. Just honest work that gets results.
          </motion.p>
          {/* What Happens Next Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden"
          >
            {/* Animated Background Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.03, 0.06, 0.03]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#beff01] blur-[120px] rounded-full pointer-events-none"
            />
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 text-center relative z-10">
              Here&apos;s Exactly What Happens Next
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  step: "1",
                  title: "We Talk",
                  desc: "Quick 15-minute call where you tell me what you need. I'll listen, ask questions, and give you honest feedback."
                },
                {
                  step: "2",
                  title: "I Create a Plan",
                  desc: "Within 48 hours, you'll get a clear roadmap with pricing, timeline, and exactly what you're getting."
                },
                {
                  step: "3",
                  title: "We Build Together",
                  desc: "Once you're happy with the plan, we start building. You'll see progress every step of the way."
                }
                
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  {/* Card Background with Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 rounded-2xl border border-zinc-800/50 group-hover:border-[#beff01]/30 transition-all duration-500" />
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-[#beff01]/0 group-hover:bg-[#beff01]/5 rounded-2xl transition-all duration-500" />
                  
                  <div className="relative p-6">
                    {/* Animated Step Number */}
                    <motion.div 
                      className="relative mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-6xl font-black text-[#beff01]/20 group-hover:text-[#beff01]/30 transition-colors duration-500">
                        {item.step}
                      </div>
                      {/* Orbiting Dot */}
                      <motion.div
                        animate={{ 
                          rotate: 360,
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.3
                        }}
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        <div className="absolute top-2 right-4 w-2 h-2 bg-[#beff01] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    </motion.div>
                    
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#beff01] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Connecting Animated Arrow (except last) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#beff01]/30 via-[#beff01]/50 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                      />
                      {/* Arrow Head */}
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                      >
                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-[#beff01]/50 border-b-[4px] border-b-transparent" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 sm:gap-3 bg-[#beff01] text-black font-black text-base sm:text-xl px-8 sm:px-14 py-4 sm:py-7 rounded-full hover:bg-[#a8e600] transition-all overflow-hidden shadow-2xl shadow-[#beff01]/30"
            >
              <span className="relative z-10">Let&apos;s Start Your Project Today</span>
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 relative z-10 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#d4ff4d] to-[#beff01]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Bottom Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="text-sm text-gray-500 mt-8 max-w-2xl mx-auto"
          >
            <span className="font-bold text-gray-400">No pressure, no hard sell.</span> Just a friendly conversation about what you need and how we can work together to make it happen. If we&apos;re not a good fit, I&apos;ll tell you honestly—and maybe point you in the right direction.
          </motion.p>
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