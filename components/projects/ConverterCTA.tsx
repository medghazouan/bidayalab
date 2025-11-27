"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ConverterCTA() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#beff01]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#beff01]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-8"
          >
            <Sparkles size={16} className="text-[#beff01]" />
            <span>Ready to transform your vision?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 max-w-4xl"
          >
            Let's build something <span className="text-[#beff01]">extraordinary</span> together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
          >
            Whether you need a cutting-edge digital platform, a stunning brand identity, or AI-powered automation, we have the expertise to bring it to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-[#beff01] text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/services"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
