'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import StackedSection from '@/components/ui/StackedSection';

export default function AboutPageClient() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#beff01] selection:text-black font-louis">
      <main className="relative w-full overflow-hidden">

        {/* 1. HERO — Marketing angle: operators, not consultants */}
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
                    The operators&rsquo; agency · Marrakech
                  </span>
                </div>

                <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-white mb-10">
                  We don&apos;t sell websites.<br />
                  <span className="text-zinc-600">We sell the number.</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                    BidayaLab is a senior-only studio for AI automation, web engineering and brand systems. Every engagement ships with a measured outcome attached &mdash; not a deliverable list.
                  </p>
                  <div className="border-l border-white/20 pl-6 md:pl-8 py-2">
                    <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed">
                      We work with founders who care less about a deck and more about a number. If we don&apos;t hit the agreed metric, we rebuild on our time. It&apos;s in the contract.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </StackedSection>

        {/* 2. WHY WE EXIST — PAS framing */}
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
                    Why we exist
                  </h2>
                  <div className="w-16 h-[2px] bg-black/20 mb-8" />
                  <p className="text-xl text-zinc-500 font-light max-w-sm">
                    Because most agencies sell hours. We sell outcomes &mdash; and put the guarantee in writing.
                  </p>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col gap-10">
                <div className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed flex flex-col gap-8">
                  <p>
                    <strong className="text-black font-bold">The problem.</strong> Founders pay for &ldquo;digital transformation&rdquo; and get a slide deck. They pay for a website and get a brochure that doesn&apos;t convert. They pay for &ldquo;AI&rdquo; and get a chatbot that nobody uses. The deliverable shows up. The number doesn&apos;t move.
                  </p>
                  <p>
                    <strong className="text-black font-bold">The cost.</strong> Every quarter you wait, your competitor automates one more workflow and shaves another point off CAC. Every WordPress site that loads in 4 seconds is silently bleeding 30&ndash;60% of mobile traffic before the page even paints.
                  </p>
                  <p>
                    <strong className="text-black font-bold">Our answer.</strong> A small senior team. A written outcome before kickoff. A measured baseline at week 1, a result snapshot at handover, and a 30-day tuning window after launch. If the number isn&apos;t there, neither is the invoice.
                  </p>
                </div>

                <div className="mt-8 p-10 md:p-14 border border-black/10 bg-zinc-50 flex flex-col items-start justify-center hover:border-black/30 transition-colors">
                  <span className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-none mb-6">100%</span>
                  <span className="text-xl font-bold uppercase tracking-wider mb-4">Measured or reworked</span>
                  <span className="text-zinc-600 text-lg font-light leading-relaxed max-w-xl">
                    Every project ships with a metric attached &mdash; conversion lift, hours saved, revenue per visitor. If we don&apos;t hit it within 30 days of handover, we keep working until we do, on our time.
                  </span>
                </div>
              </div>

            </div>
          </motion.section>
        </StackedSection>

        {/* 3. THE METHOD — 3-step measured process */}
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
                    The measured method
                  </h2>
                  <p className="text-xl text-zinc-400 max-w-xl font-light">
                    Three steps. Every one ends in a number you can put on a slide.
                  </p>
                </div>
              </div>

              <ul className="grid lg:grid-cols-3 gap-6 list-none p-0">
                {[
                  {
                    num: '01',
                    title: 'Audit & baseline',
                    desc: 'A senior operator pulls apart your funnel, ops or brand. We measure the current state &mdash; conversion, hours per task, time-to-launch &mdash; and write the target number into the proposal. 30 minutes, free.'
                  },
                  {
                    num: '02',
                    title: 'Build & ship',
                    desc: 'Senior-only delivery. n8n / GPT for ops, Next.js or Shopify Hydrogen for web, in-house brand & motion. Weekly demo, no &ldquo;status update&rdquo; theater. You see the system run before you sign off.'
                  },
                  {
                    num: '03',
                    title: 'Measure & rework',
                    desc: '30-day tuning window after handover. We watch the metric, iterate, and keep going until the number lands. If it doesn&apos;t, we rebuild on our time. The guarantee is in the contract, not in the marketing.'
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

        {/* 4. PROOF IN NUMBERS — social proof aggregate */}
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
                  Proof in<br />numbers
                </h2>
                <p className="text-xl text-zinc-600 font-light leading-relaxed mb-8">
                  We don&apos;t do testimonial walls. We do measured outcomes &mdash; pulled straight from client analytics, not invented for the website.
                </p>
                <Link href="/works" className="inline-block border border-black px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-[#beff01] transition-colors">
                  See full case studies
                </Link>
              </div>

              <dl className="md:col-span-7 border-t border-black/10">
                {[
                  { label: 'Average conversion lift', val: '+218% (Shopify rebuilds)' },
                  { label: 'Ops automated', val: '−94% manual hours / month' },
                  { label: 'Engagement on launch films', val: '×3.4 vs. industry baseline' },
                  { label: 'Active markets', val: 'Morocco · France · UAE · KSA · US' },
                  { label: 'Languages delivered', val: 'FR · AR · EN · DE on request' },
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

        {/* 5. THE TEAM — Operators, not consultants */}
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
                  Operators, not consultants
                </h2>
                <p className="text-xl text-zinc-400 font-light max-w-2xl">
                  Senior-only delivery. The person on your audit call is the person on your build &mdash; no juniors learning on your budget, no agency middle-layer translating between you and the work.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="border border-white/10 p-10 bg-[#beff01] text-black hover:bg-white transition-colors flex flex-col justify-end min-h-[300px]">
                  <p className="text-7xl font-black tracking-tighter mb-2">3</p>
                  <p className="text-sm font-bold uppercase tracking-widest">Active projects this quarter</p>
                  <p className="text-sm font-medium mt-3 opacity-70">Intentionally capped &mdash; the guarantee depends on it.</p>
                </div>

                <div className="border border-white/10 p-10 bg-white/[0.02] flex items-center min-h-[300px] lg:col-span-2 hover:bg-white/[0.05] transition-colors">
                  <h3 className="text-2xl md:text-4xl font-light text-white leading-snug">
                    &ldquo;We don&apos;t hire generalists. We hire <strong className="font-bold text-[#beff01]">operators</strong> who&apos;ve shipped, scaled and seen what breaks at the next stage.&rdquo;
                  </h3>
                </div>

                <div className="border border-white/10 p-10 bg-white/[0.02] lg:col-span-3 min-h-[250px] flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-6 block">In-house disciplines</span>
                  <div className="flex flex-wrap gap-4">
                    {['n8n & Make automation', 'GPT agents', 'Next.js engineering', 'Shopify Hydrogen', 'Conversion design', 'Brand systems', 'Motion & product film', 'CWV · SEO'].map((skill) => (
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

        {/* 6. CTA — high-conversion close */}
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
                Free 30-min audit · 3 slots open this quarter
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Stop guessing.<br />Get the number.
              </h2>
              <p className="text-lg md:text-xl text-zinc-600 font-light max-w-2xl mx-auto mb-12">
                30 minutes with a senior operator. We pull apart your funnel and you leave with a written highest-leverage fix &mdash; even if you never hire us.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                <Link href="/contact" className="w-full md:w-auto inline-flex items-center justify-center bg-black text-white px-12 py-5 text-sm font-bold uppercase tracking-widest border border-black hover:bg-[#beff01] hover:text-black hover:border-[#beff01] transition-colors">
                  Book my audit
                </Link>
                <div className="text-left w-full md:w-auto">
                   <p className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-1 block">Or write directly</p>
                   <a href="mailto:hello@bidayalab.com" className="text-xl font-bold text-black hover:text-zinc-600 transition-colors border-b border-black">hello@bidayalab.com</a>
                </div>
              </div>
            </div>
          </motion.section>
        </StackedSection>

      </main>
    </div>
  );
}
