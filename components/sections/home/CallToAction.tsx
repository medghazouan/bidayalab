'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * Home CTA — ported from the laboratory-direction CtaSection.
 * Sales-psychology angle: free 30-min audit, priced answer in 48h, honest-or-walk away,
 * measured-or-reworked guarantee, capped intake.
 *
 * Design tokens preserved: aurora glow, dot grid, lime (#beff01) accents,
 * Louis display font, mono eyebrow.
 */
export default function CallToAction() {
  const proofs = [
    { value: '+218%', label: 'Avg conversion lift' },
    { value: '−94%', label: 'Manual hours / month' },
    { value: '< 24h', label: 'Reply guaranteed' },
    { value: '3', label: 'Slots open this quarter' },
  ];

  return (
    <section className="relative w-full px-4 md:px-8 xl:px-12 py-24 md:py-32 bg-[#050505]">
      <div className="relative mx-auto w-full max-w-[1500px]">
        <div className="relative isolate overflow-hidden border border-white/10 bg-[#0a0a0a] p-8 md:p-16 lg:p-20">
          {/* Aurora glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/3 -right-1/3 h-[600px] w-[600px] rounded-full bg-[#beff01]/[0.18] blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-1/3 -left-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[120px]"
          />
          {/* Dot grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-w-2xl flex-col gap-6"
            >
              <span className="inline-flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#beff01]">
                <span className="inline-block h-px w-8 bg-[#beff01]" />
                Ready? · Free 30-min audit
              </span>

              <h2 className="font-louis font-bold uppercase text-white text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] tracking-tighter">
                30-minute brief.<br />
                <span className="text-[#beff01]">Priced answer in 48h.</span>
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-zinc-400 font-louis leading-relaxed max-w-xl">
                No commitment, no disguised sales pitch. You leave with a written highest-leverage fix and an honest price tag — even if we&apos;re not the ones building it.
              </p>

              {/* Risk-reversal microcopy — three proof bullets */}
              <ul className="flex flex-col gap-2.5 text-sm md:text-base text-zinc-300 max-w-xl pt-2">
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#beff01] flex-shrink-0" />Senior operator on the call — same one on the build.</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#beff01] flex-shrink-0" />Measured-or-reworked guarantee, written into the contract.</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#beff01] flex-shrink-0" />Honest pricing from 28k MAD · we tell you straight if we&apos;re not the fit.</li>
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-7 md:px-9 py-4 md:py-5 bg-[#beff01] text-black font-louis font-bold uppercase tracking-wider text-sm md:text-base hover:bg-white transition-colors"
                >
                  Get my growth audit
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </Link>
                <Link
                  href="/works"
                  className="inline-flex items-center gap-3 px-7 md:px-9 py-4 md:py-5 border border-white/20 text-white font-louis font-bold uppercase tracking-wider text-sm md:text-base hover:bg-white/5 hover:border-white/40 transition-colors"
                >
                  See the numbers
                </Link>
              </div>
            </motion.div>

            {/* Right: proof grid */}
            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-x-8 md:gap-x-10 gap-y-6 md:gap-y-8 md:max-w-md"
            >
              {proofs.map((p, i) => (
                <li key={i} className="flex flex-col gap-2 border-l border-white/15 pl-4">
                  <span className="font-louis font-bold text-3xl md:text-4xl lg:text-5xl leading-none tracking-tight text-[#beff01]">
                    {p.value}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-zinc-500">
                    {p.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
