'use client';


import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor } from 'lucide-react';

export default function Hero() {
  const router = useRouter();

  const scrollToWorks = () => {
    const firstProject = document.getElementById('first-project');
    if (firstProject) {
      const offset = 100; // Adjust based on header height
      const elementPosition = firstProject.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContact = () => {
    router.push('/contact#contact-form');
  };

  return (
    <section className="relative pt-24 md:pt-36 lg:pt-40 pb-12 md:pb-24 lg:pb-32 overflow-hidden">
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
            Is Your Website
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Costing You Money?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
          >
            You&apos;ve got a great product. Now you need a digital partner who cares about your bottom line as much as you do.
            No fluff, no empty promises just real results that move your business forward.
          </motion.p>
        </motion.div>

        {/* Two-Column Layout: Capabilities + CTAs (Left) | Insight Card (Right) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch">
          {/* LEFT COLUMN - Capabilities + CTAs */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
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
                  { id: "01", title: "Websites That Convert", psycho: "Code that prints money. Fast, scalable, and built to convert." },
                  { id: "02", title: "Campaigns That Pay Back", psycho: "We don&apos;t buy clicks. We buy customers who stay." },
                  { id: "03", title: "Brands They Can't Ignore", psycho: "Design so good, they can't ignore you. Period." },
                  { id: "04", title: "Systems That Save Time", psycho: "Work less. Earn more. Let robots handle the boring stuff." },
                  { id: "05", title: "Stories That Sell", psycho: "Stories that sell. Content that builds cults." }
                ].map((item, index) => (
                  <ServiceItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Insight Card + Social Proof */}
          <div className="w-full lg:w-1/2 flex flex-col h-full">
            <div className="flex flex-col gap-8 h-full">
              {/* Insight Card */}
              <div className="relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm p-12 flex flex-col justify-center flex-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/5 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-white mb-6 leading-tight">
                    We don&apos;t just deliver services.
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

        {/* CTA Buttons - Side by Side on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 w-full max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-center">
            {/* Primary CTA - Contact Page */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group flex-1"
            >
              <button
                onClick={scrollToContact}
                className="relative block w-full h-full"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#beff01] to-green-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main Button */}
                <div className="relative bg-gradient-to-r from-[#beff01] to-[#d4ff4d] text-black rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.3),transparent)]" />
                  </div>

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="text-left">
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
                      <h3 className="text-lg md:text-xl lg:text-2xl font-black leading-tight">
                        Start a Project
                      </h3>
                      <p className="text-xs md:text-sm font-bold opacity-80 mt-1">Free strategy call</p>
                    </div>

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/20 transition-all group-hover:scale-110 flex-shrink-0">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:translate-x-1 transition-transform" />
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

            {/* Secondary CTA - View Work */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <button
                onClick={scrollToWorks}
                className="w-full h-full group relative bg-zinc-900/80 border-2 border-zinc-800 hover:border-[#beff01]/50 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-800/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-[#beff01] to-green-500 border-2 border-zinc-900"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">20+ Clients</span>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white">
                      View Our Work
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">Real results, no fluff</p>
                  </div>

                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#beff01]/10 group-hover:border-[#beff01]/30 transition-all flex-shrink-0"
                  >
                    <Monitor className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-[#beff01] transition-colors" />
                  </motion.div>
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

function ServiceItem({ item, index }: { item: { id: string; title: string; psycho: string }, index: number }) {
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