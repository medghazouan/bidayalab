'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, Zap, Rocket, MessageCircle, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
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
            Let's Create
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
            Look, I know taking the first step can feel risky. You're wondering: 
            <span className="text-white font-semibold"> "Will this actually work?"</span> Here's what I can promise you—
            <span className="text-[#beff01] font-semibold"> I'll treat your business like it's my own</span>. 
            No cutting corners, no cookie-cutter solutions. Just honest work that gets results.
          </motion.p>

          {/* Trust Builders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          >
            {[
              { 
                icon: Clock, 
                title: "Quick Response Time", 
                desc: "I'll get back to you within 24 hours—usually much faster. Your time matters.",
              },
              { 
                icon: MessageCircle, 
                title: "Free Consultation", 
                desc: "No sales pitch, no pressure. Just a genuine conversation about your goals.",
              },
              { 
                icon: Shield, 
                title: "Transparent Process", 
                desc: "You'll know exactly what's happening at every step. No surprises, ever.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-[#beff01]/50 hover:shadow-xl hover:shadow-[#beff01]/10 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#beff01]/10 border border-[#beff01]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-[#beff01]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* What Happens Next Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 md:p-12 mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
              Here's Exactly What Happens Next
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="relative"
                >
                  <div className="text-6xl font-black text-[#beff01]/20 mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  
                  {/* Connecting Line (except last) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#beff01]/30 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 rounded-full px-6 py-3 backdrop-blur-xl">
              <Users className="w-5 h-5 text-[#beff01]" />
              <span className="text-sm text-gray-300">
                <span className="text-[#beff01] font-bold">20+ happy clients</span> already growing
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#beff01]" />
              <span>Average project satisfaction: <span className="text-white font-bold">9.8/10</span></span>
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
              className="group relative inline-flex items-center gap-3 bg-[#beff01] text-black font-black text-xl px-14 py-7 rounded-full hover:bg-[#a8e600] transition-all overflow-hidden shadow-2xl shadow-[#beff01]/30"
            >
              <Rocket className="w-7 h-7 relative z-10" />
              <span className="relative z-10">Let's Start Your Project Today</span>
              <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform" />
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
            <span className="font-bold text-gray-400">No pressure, no hard sell.</span> Just a friendly conversation about what you need and how we can work together to make it happen. If we're not a good fit, I'll tell you honestly—and maybe point you in the right direction.
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