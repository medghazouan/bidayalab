'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';

export default function CallToAction() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#beff01] overflow-hidden py-24 md:py-32 px-4 md:px-8">

      {/* Abstract Background Decor (Subtle) */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white opacity-20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white opacity-20 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">

        {/* LEFT: IMPACT COPY */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/20 bg-black/5 text-black text-xs font-bold font-mono uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              Accepting New Projects
            </div>

            <h2 className="text-[12vw] sm:text-[11vw] lg:text-[9vw] font-black font-louis text-black tracking-tighter leading-[0.85] uppercase">
              Let&apos;s <br />
              Grow <span className="text-white">Together.</span>
            </h2>

            <p className="text-black/70 text-lg md:text-2xl font-medium max-w-xl leading-relaxed">
              Ready to stand out? Let&apos;s create something extraordinary together. We&apos;re here to help you lead your industry and scale your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-8 border-t border-black/10 pt-8"
          >
            {[
              { label: 'Strategy', value: 'Data-Driven' },
              { label: 'Design', value: 'World-Class' },
              { label: 'Development', value: 'Bleeding Edge' }
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-xl md:text-2xl font-black font-louis text-black uppercase">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: CONVERSION FORM */}
        <div className="lg:col-span-5">
          <LeadForm />
        </div>

      </div>
    </section>
  );
}

// --- FORM COMPONENT ---
function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await submitLead(formData);

    if (result.success) {
      setTimeout(() => setStatus('success'), 800);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-black text-white p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl"
      >
        <div className="w-24 h-24 rounded-full bg-[#beff01] flex items-center justify-center text-black mb-2">
          <CheckCircle2 size={48} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-4xl font-black font-louis uppercase mb-4">You're In.</h3>
          <p className="text-zinc-400 text-lg">We'll be in touch within 24 hours.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-transparent"
    >
      <form action={handleSubmit} className="flex flex-col gap-8">

        {/* Industry Selection */}
        <div className="space-y-4">
          <label id="industry-label" className="text-xs font-bold font-louis text-black uppercase tracking-widest">
            01. Select Your Industry
          </label>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-labelledby="industry-label">
            {['E-Com', 'SaaS', 'Real Estate', 'Finance', 'Health', 'Other'].map((ind) => (
              <label key={ind} className="cursor-pointer group flex-1 min-w-[100px]">
                <input type="radio" name="industry" value={ind} required className="peer sr-only" />
                <div className="
                  px-4 py-3 border-2 border-black text-black font-bold font-louis text-sm uppercase text-center tracking-wider transition-all
                  hover:bg-black hover:text-[#beff01]
                  peer-checked:bg-black peer-checked:text-[#beff01]
                ">
                  {ind}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-4">
          <label htmlFor="lead-email" className="text-xs font-bold font-louis text-black uppercase tracking-widest">
            02. Your Email Address
          </label>
          <div className="relative group">
            <input
              id="lead-email"
              type="email"
              name="email"
              required
              placeholder="YOUR@EMAIL.COM"
              className="
                w-full bg-transparent border-b-2 border-black py-3 md:py-4 px-0 
                text-black placeholder:text-black/30 
                font-black font-louis text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight
                focus:outline-none focus:border-white transition-colors
              "
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <ArrowUpRight className="w-8 h-8 text-black opacity-30 group-focus-within:opacity-100 group-focus-within:rotate-45 transition-all" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="
              group w-full bg-black text-[#beff01] py-6 px-8 
              flex items-center justify-between
              hover:bg-white hover:text-black transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed shadow-xl
            "
          >
            <span className="font-black font-louis text-2xl uppercase tracking-widest">
              {status === 'submitting' ? 'Processing...' : 'Start Now'}
            </span>
            <div className="w-10 h-10 bg-[#beff01] text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              {status === 'submitting' ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
              )}
            </div>
          </button>

          <div aria-live="polite" className="text-center text-xs font-bold text-black/40 mt-6 uppercase tracking-widest">
            {status === 'error' ? (
              <p role="alert" className="text-red-600">Something went wrong. Please try again.</p>
            ) : (
              <p>Limited Spots Available for {new Date().toLocaleString('default', { month: 'long' })}</p>
            )}
          </div>
        </div>

      </form>
    </motion.div>
  );
}
