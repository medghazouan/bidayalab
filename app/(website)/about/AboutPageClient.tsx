'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import StackedSection from '@/components/ui/StackedSection';

export default function AboutPageClient() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#beff01] selection:text-black font-louis">
      <main className="relative w-full overflow-hidden">
        
        {/* Hero Section - Exaggerated Minimalism */}
        <StackedSection index={0}>
          <section className="relative min-h-[60vh] flex flex-col justify-end pb-20 pt-40 px-4 md:px-8 xl:px-12 bg-[#050505]">
            <div className="max-w-[1920px] w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl"
              >
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#beff01] font-bold">
                    Who We Are
                  </span>
                </div>
                
                <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-white mb-10">
                  We Architect <br />
                  <span className="text-zinc-600">Futures.</span>
                </h1>
                
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                    <strong>What is BidayaLab?</strong> We are a digital transformation agency and software engineering firm based in Marrakech, Morocco.
                  </p>
                  <div className="border-l border-white/20 pl-6 md:pl-8 py-2">
                    <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed">
                      We engineer custom web applications, deploy autonomous artificial intelligence (AI) workflows, and design premium brand identities for ambitious enterprises around the globe.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </StackedSection>

        {/* The Vision - Swiss Modernism */}
        <StackedSection index={1}>
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-white text-black"
          >
            <div className="max-w-[1920px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20">
              
              <div className="md:col-span-5 relative">
                <div className="sticky top-32">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                    The Vision
                  </h2>
                  <div className="w-16 h-[2px] bg-black/20 mb-8" />
                  <p className="text-xl text-zinc-500 font-light max-w-sm">
                    Born from the necessity of modernization, we bridge the gap between legacy operations and the digital frontier.
                  </p>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col gap-10">
                <div className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed flex flex-col gap-8">
                  <p>
                    BidayaLab operates at the intersection of logic and imagination. We specialize in helping small and medium-sized enterprises (SMEs) not just survive, but thrive in the fast-paced digital economy. 
                  </p>
                  <p>
                    The name <strong className="text-black font-bold">&quot;Bidaya&quot;</strong> signifies &quot;beginning&quot; in Arabic. It represents our core philosophy: every massive technological leap starts with a single, decisive step towards transformation.
                  </p>
                </div>

                <div className="mt-8 p-10 md:p-14 border border-black/10 bg-zinc-50 flex flex-col items-start justify-center hover:border-black/30 transition-colors">
                  <span className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-none mb-6">72%</span>
                  <span className="text-xl font-bold uppercase tracking-wider mb-4">Accelerated Revenue Growth</span>
                  <span className="text-zinc-600 text-lg font-light leading-relaxed max-w-xl">
                    SMEs investing radically in digital transformation report massive revenue spikes within 12 months. We are the precise catalyst for that growth.
                  </span>
                </div>
              </div>

            </div>
          </motion.section>
        </StackedSection>

        {/* Expertise - Flat Grid */}
        <StackedSection index={2}>
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-[#050505] border-t border-white/10"
          >
            <div className="max-w-[1920px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 text-white">
                    Core Expertise
                  </h2>
                  <p className="text-xl text-zinc-400 max-w-xl font-light">
                    Three distinct pillars of service, unified by one objective: measurable business scalability.
                  </p>
                </div>
              </div>

              <ul className="grid lg:grid-cols-3 gap-6 list-none p-0">
                {[
                  {
                    num: '01',
                    title: 'AI Automation',
                    desc: 'We map your operational bottlenecks and deploy autonomous AI agents, smart chatbots, and CRM workflows that operate 24/7.'
                  },
                  {
                    num: '02',
                    title: 'Web Engineering',
                    desc: 'From high-converting landing pages to complex enterprise web applications. We build resilient, blazing-fast digital platforms.'
                  },
                  {
                    num: '03',
                    title: 'Visual Storytelling',
                    desc: 'Premium design, motion graphics, and brand identity strategies that elevate market perception and captivate your audience.'
                  }
                ].map((s, i) => (
                  <motion.li 
                    key={s.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex flex-col justify-between min-h-[360px] p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#beff01]/50 transition-colors duration-300"
                  >
                    <span className="text-2xl font-black text-white/20 group-hover:text-[#beff01] transition-colors mb-8" aria-hidden="true">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{s.title}</h3>
                      <p className="text-zinc-400 leading-relaxed font-light">
                        {s.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>
        </StackedSection>

        {/* Global Reach - Flat Stylized Typographic Section */}
        <StackedSection index={3}>
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-white text-black border-t border-black/10"
          >
            <div className="max-w-[1920px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="md:col-span-5">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                  Global Reach
                </h2>
                <p className="text-xl text-zinc-600 font-light leading-relaxed mb-8">
                  While our roots run deep in Marrakech, our infrastructure is entirely cloud-native and borderless. We deploy solutions for ambitious brands worldwide.
                </p>
                <div className="inline-block border border-black px-6 py-2 text-sm font-bold uppercase tracking-widest">
                  HQ: Marrakech, Morocco
                </div>
              </div>

              <dl className="md:col-span-7 border-t border-black/10">
                {[
                  { label: 'Primary Markets', val: 'MENA, Europe, North America' },
                  { label: 'Timezones Supported', val: 'GMT to EST (+/- 5hrs coverage)' },
                  { label: 'Projects Deployed', val: '50+ Global Implementations' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/10 group hover:bg-zinc-50 transition-colors px-4 -mx-4">
                    <dt className="text-sm uppercase tracking-widest font-bold text-zinc-400 mb-2 md:mb-0 group-hover:text-black transition-colors">{stat.label}</dt>
                    <dd className="text-xl font-medium text-black m-0">{stat.val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.section>
        </StackedSection>

        {/* Our Team - Flat Grid */}
        <StackedSection index={4}>
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-[#050505] border-t border-white/10"
          >
            <div className="max-w-[1920px] mx-auto">
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
                  The Architects
                </h2>
                <p className="text-xl text-zinc-400 font-light max-w-2xl">
                  A multi-disciplinary collective of engineers, designers, and strategists obsessed with flawless execution.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="border border-white/10 p-10 bg-[#beff01] text-black hover:bg-white transition-colors flex flex-col justify-end min-h-[300px]">
                  <p className="text-7xl font-black tracking-tighter mb-2">10+</p>
                  <p className="text-sm font-bold uppercase tracking-widest">Elite Creators</p>
                </div>

                <div className="border border-white/10 p-10 bg-white/[0.02] flex items-center min-h-[300px] lg:col-span-2 hover:bg-white/[0.05] transition-colors">
                  <h3 className="text-2xl md:text-4xl font-light text-white leading-snug">
                    &quot;We don&apos;t hire employees. We partner with <strong className="font-bold text-[#beff01]">craftsmen</strong> who treat every system they build as a piece of art.&quot;
                  </h3>
                </div>

                <div className="border border-white/10 p-10 bg-white/[0.02] lg:col-span-3 min-h-[250px] flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-6 block">Core Operational Disciplines</span>
                  <div className="flex flex-wrap gap-4">
                    {['Systems Architecture', 'Machine Learning', 'UX Engineering', 'Brand Identity', 'Cloud Infrastructure', 'Motion Design'].map((skill) => (
                      <span key={skill} className="px-5 py-3 text-sm font-bold uppercase tracking-widest border border-white/10 text-white hover:bg-[#beff01] hover:text-black hover:border-[#beff01] transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </motion.section>
        </StackedSection>

        {/* CTA - Classic Component Style */}
        <StackedSection index={5}>
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 md:py-32 px-4 md:px-8 xl:px-12 bg-white text-black border-t border-black/10"
          >
            <div className="max-w-[1920px] mx-auto text-center">
              <span className="text-[#beff01] bg-black px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold mb-8 inline-block">
                Ready to Scale?
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Initiate Your <br/>Transformation.
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                <Link href="/contact" className="w-full md:w-auto inline-flex items-center justify-center bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-widest border border-black hover:bg-[#beff01] hover:text-black hover:border-[#beff01] transition-colors">
                  Start Dialogue
                </Link>
                <div className="text-left w-full md:w-auto">
                   <p className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-1 block">Direct Line</p>
                   <a href="mailto:support@bidayalab.com" className="text-xl font-bold text-black hover:text-zinc-600 transition-colors border-b border-black">support@bidayalab.com</a>
                </div>
              </div>
            </div>
          </motion.section>
        </StackedSection>

      </main>
    </div>
  );
}
