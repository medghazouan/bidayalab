'use client';

import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CallToAction() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const offset = 100;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
        {/* Section Header - Original Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
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
              The Choice Is Yours
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Ready To Stop
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Playing Small?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-16"
          >
            You've got two options: Keep scrolling and hoping things change on their own,
            <br />
            <span className="text-white font-bold">or take 30 seconds to start something real.</span>
          </motion.p>

          {/* Interactive Question Cards - Simple & Creative */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: Zap,
                question: "Tired of generic solutions?",
                answer: "We build custom, not cookie-cutter",
                accentColor: "from-[#beff01] to-[#d4ff4d]"
              },
              {
                icon: TrendingUp,
                question: "Want results, not promises?",
                answer: "We track everything, prove everything",
                accentColor: "from-green-400 to-[#beff01]"
              },
              {
                icon: Trophy,
                question: "Ready to outgrow competitors?",
                answer: "We help you dominate, not compete",
                accentColor: "from-[#d4ff4d] to-green-500"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Simple Card */}
                <div className="relative bg-zinc-900/50 border-2 border-zinc-800 hover:border-[#beff01]/50 rounded-2xl p-6 h-full backdrop-blur-sm transition-all duration-300">
                  {/* Accent Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentColor} rounded-t-2xl`} />

                  {/* Simple Icon */}
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#beff01]/10 group-hover:bg-[#beff01]/20 transition-colors">
                    <card.icon className="w-6 h-6 text-[#beff01]" />
                  </div>

                  {/* Question */}
                  <h3 className="text-lg font-black text-white mb-2 leading-tight">
                    {card.question}
                  </h3>

                  {/* Answer - Always Visible */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simple CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-[#beff01] hover:bg-[#d4ff4d] text-black font-black text-2xl px-12 py-6 rounded-full transition-all duration-300 shadow-lg shadow-[#beff01]/20 hover:shadow-2xl hover:shadow-[#beff01]/40"
            >
              <span className="relative z-10 flex items-center gap-3">
                Let's Talk Growth
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Bottom Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-sm text-gray-500 mt-8 max-w-2xl mx-auto"
          >
            <span className="font-bold text-white">No sales pitch.</span> Just you, me, and a whiteboard figuring out how to get you where you want to be. If we click, awesome. If not, I'll point you to someone who's a better fit.
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