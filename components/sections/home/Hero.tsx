'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, TrendingUp, Palette, Bot, Clapperboard } from 'lucide-react';

export default function Hero() {
  const scrollToWorks = () => {
    const worksSection = document.getElementById('works-section');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      // Scroll with some offset to show the form nicely
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
    <section className="relative pt-20 md:pt-32 pb-6 md:pb-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header - Centered (Keep Original) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
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
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
          >
            We&apos;re Bidayalab , and we help ambitious business owners like you turn their online presence into a
            powerful growth engine.
            No fluff, no empty promises—just real results that move your business forward.
          </motion.p>
        </motion.div>

        {/* Two-Column Layout: Capabilities + CTAs (Left) | Insight Card (Right) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN - Capabilities + CTAs */}
          <div className="w-full lg:w-1/2">
            {/* Capabilities List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12"
            >
              <p className="text-[#beff01] mb-8 text-sm uppercase tracking-[0.2em] font-bold">
                Our Capabilities
              </p>

              <div className="space-y-6">
                {[
                  { id: "01", title: "Digital Development", psycho: "Code that prints money. Fast, scalable, and built to convert." },
                  { id: "02", title: "Growth Marketing", psycho: "We don't buy clicks. We buy customers who stay." },
                  { id: "03", title: "Creative Studio", psycho: "Design so good, they can't ignore you. Period." },
                  { id: "04", title: "AI Automation", psycho: "Work less. Earn more. Let robots handle the boring stuff." },
                  { id: "05", title: "Visual Storytelling", psycho: "Stories that sell. Content that builds cults." }
                ].map((item, index) => (
                  <ServiceItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Insight Card + Social Proof */}
          <div className="hidden lg:flex lg:w-1/2 flex-col">
            <div className="sticky top-32 flex flex-col gap-8">
              {/* Insight Card */}
              <div className="relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm p-12 flex flex-col justify-center min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/5 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-white mb-6 leading-tight">
                    We don't just deliver services.
                    <br />
                    <span className="text-[#beff01]">We deliver unfair advantages.</span>
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Every capability we offer is designed to solve one specific problem: <span className="text-white font-bold">How to make your business dominant in a crowded market.</span>
                  </p>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#beff01] flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-black -rotate-45" />
                    </div>
                    <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Hover the list to see how
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 rounded-full px-6 py-3 backdrop-blur-xl w-fit">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#beff01] to-green-500 border-2 border-black flex items-center justify-center"
                      />
                    ))}
                  </div>
                  <span className="text-gray-300 text-sm">
                    <span className="text-[#beff01] font-bold">20+ businesses</span> already growing with us
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm px-2">
                  <span>Based in Marrakech, serving clients worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Centered Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="flex flex-col gap-4">
            {/* Primary CTA - High Conversion */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <button
                onClick={scrollToContact}
                className="relative block w-full"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#beff01] to-green-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main Button */}
                <div className="relative bg-gradient-to-r from-[#beff01] to-[#d4ff4d] text-black rounded-2xl p-6 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.3),transparent)]" />
                  </div>

                  <div className="relative flex items-center justify-between">
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-wider opacity-70">Limited Slots</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-black/40"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black leading-tight">
                        Let's Build Your Empire
                      </h3>
                      <p className="text-sm font-bold opacity-80 mt-1">Free 30-min strategy call • No pitch, just value</p>
                    </div>

                    <div className="ml-4">
                      <div className="w-14 h-14 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/20 transition-all group-hover:scale-110">
                        <ArrowRight className="w-7 h-7 text-black group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </button>
            </motion.div>

            {/* Secondary CTA - Social Proof Driven */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={scrollToWorks}
                className="w-full group relative bg-zinc-900/80 border-2 border-zinc-800 hover:border-[#beff01]/50 rounded-2xl p-5 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-800/80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-[#beff01] to-green-500 border-2 border-zinc-900"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">20+ Success Stories</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white">
                      See Real Results
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Portfolio that proves we deliver</p>
                  </div>

                  <div className="ml-4">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#beff01]/10 group-hover:border-[#beff01]/30 transition-all"
                    >
                      <Monitor className="w-6 h-6 text-gray-400 group-hover:text-[#beff01] transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </button>
            </motion.div>
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
    </section >
  );
}

function ServiceItem({ item, index }: { item: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative border-b border-white/10 last:border-none"
    >
      <div className="flex items-baseline gap-6 cursor-pointer py-6">
        <span className="text-sm font-mono text-gray-600 group-hover:text-[#beff01] transition-colors duration-300">
          {item.id}
        </span>
        <div className="flex-1">
          <h3 className="text-3xl md:text-5xl font-black text-white group-hover:text-[#beff01] transition-colors duration-300">
            {item.title}
          </h3>
          {/* Mobile Only Description */}
          <p className="lg:hidden text-gray-400 mt-2 text-sm">
            {item.psycho}
          </p>

          {/* Desktop Hover Reveal - Absolute positioned to appear in the right column area (simulated via fixed or portal if needed, but here we keep it simple or use the parent state if we could. 
              Since we can't easily lift state without changing the parent to a client component with state, we'll use a CSS-based approach or just keep the item simple and let the user imagine the connection, 
              OR we can make the item itself reveal the text inline for a cleaner effect.) 
              
              Actually, the user wants a "psycho way to talk". Let's make the text appear INLINE on hover, pushing content down? 
              No, that's jerky. 
              
              Let's make the "Psycho" text appear right below the title on hover for desktop too.
          */}
          <div className="hidden lg:grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <p className="text-xl text-gray-400 mt-4 font-medium leading-relaxed border-l-2 border-[#beff01] pl-6">
                {item.psycho}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}