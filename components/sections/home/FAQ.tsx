'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// FAQ Data — objection-handling, every answer ties back to a measurable outcome
const faqs = [
  {
    id: 1,
    question: 'How is BidayaLab different from a freelancer or a generalist agency?',
    answer: 'Three differences. (1) We commit to a measured outcome on every project — conversion lift, hours saved, revenue per visitor — written into the proposal, not a vague brief. (2) Senior-only team, no juniors learning on your budget. (3) AI automation, web engineering and brand sit in one studio, so your funnel ships as a system, not as four disconnected vendors.',
  },
  {
    id: 2,
    question: 'What does a project actually cost?',
    answer: 'Web from 45,000 MAD. AI automation builds from 28,000 MAD. Brand systems from 38,000 MAD. We publish starting prices instead of hiding them behind a discovery call — you should know the order of magnitude before you talk to us. Final scope is fixed in writing after the free 30-min audit.',
  },
  {
    id: 3,
    question: 'How long until I see real results?',
    answer: 'AI automation: 2–4 weeks to first measurable hours saved. Web/Shopify rebuild: 6–10 weeks to launch, conversion lift typically visible within 30 days post-launch. Brand systems: 4–6 weeks to a launchable identity. Every project ships with a baseline measurement at week 1 and a result snapshot at handover.',
  },
  {
    id: 4,
    question: 'What if the project does not hit the agreed result?',
    answer: 'We rebuild on our time until it does. The measured-or-reworked guarantee is written into the contract — not a marketing line. We can do this because we only take on engagements where we have line-of-sight to the outcome, which is also why availability is intentionally limited.',
  },
  {
    id: 5,
    question: 'Do you work with clients outside Morocco?',
    answer: 'Yes. ~40% of current engagements are EU/MENA (France, UAE, KSA, North America). The team is remote-first, fluent in French/Arabic/English, and we run a 9 AM–9 PM Morocco-time window which covers GMT to EST without late nights.',
  },
  {
    id: 6,
    question: 'Why are you only running 3 projects per quarter?',
    answer: 'Because the guarantee is real. Senior-only delivery + a written outcome means we cap intake to keep quality non-negotiable. Slots open quarterly — if this one is full we will tell you straight and put you in the next intake instead of slow-walking you.',
  },
  {
    id: 7,
    question: 'What happens after launch — do we lose you?',
    answer: 'No. Every build includes a 30-day measurement window after handover where we tune until the metric is hit. After that you can keep us on a retainer (analytics, iteration, new features) or take it fully in-house — your codebase, your dashboards, your accounts.',
  },
];

// FAQ Item Component
function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`border-b border-zinc-800 transition-colors duration-500 ${isOpen ? 'bg-zinc-900/30' : 'hover:bg-zinc-900/10'}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full py-6 md:py-8 pl-4 pr-4 md:pl-8 md:pr-8 flex items-start justify-between gap-4 text-left group"
      >
        <span id={`faq-question-${faq.id}`} className={`text-lg md:text-xl lg:text-2xl font-louis font-medium transition-colors duration-300 ${isOpen ? 'text-[#beff01]' : 'text-white group-hover:text-[#beff01]'}`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#beff01] border-[#beff01] rotate-180' : 'group-hover:border-[#beff01] rotate-0'}`}>
          <Plus aria-hidden="true" className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-black' : 'text-white group-hover:text-[#beff01]'}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="pl-4 pr-4 md:pl-8 md:pr-8 pb-6 md:pb-8"
            >
              <p className="text-zinc-400 font-louis text-base md:text-lg leading-relaxed max-w-4xl">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq-section"
      className="relative bg-transparent border-t border-zinc-900"
    >
      {/* Section Header */}
      <div className="w-full px-4 md:px-8 pt-20 md:pt-32 pb-10 md:pb-16">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-2"
        >
          <div className="flex items-center gap-3 px-5 py-2.5 bg-[#beff01]">
            <span className="text-sm font-louis font-bold text-black uppercase tracking-wide">FAQ</span>
            <svg aria-hidden="true" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-louis font-bold text-white leading-[1.05] tracking-tight mb-4"
        >
          The objections.<br />
          <span className="text-[#beff01]">Answered straight.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
        >
          The questions every serious buyer asks before hiring an agency. Honest pricing, real timelines, written guarantees — no hedging.
        </motion.p>
      </div>

      {/* FAQ Content */}
      <div className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="w-full">
          {/* FAQ List */}
          <div className="border-t border-zinc-800">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>

          {/* Bottom CTA Row - Standardized to match Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4"
          >
            <p className="text-zinc-400 font-louis text-lg md:text-xl text-left">
              Have a question we did not answer?{" "}
              <span className="text-white">Get a written reply in &lt; 24h.</span>
            </p>
            <a
              href="/contact"
              className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#beff01] text-black font-louis font-bold text-lg transition-all duration-300 hover:bg-white"
            >
              Get my growth audit
              <svg
                aria-hidden="true"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
