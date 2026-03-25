'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// FAQ Data
const faqs = [
  {
    id: 1,
    question: 'What services does Bidayalab offer?',
    answer: 'We offer a comprehensive suite of digital services including brand strategy & identity design, web development, digital marketing, AI automation solutions, and visual storytelling through photo & video production. Each service is tailored to help businesses grow and stand out in the digital landscape.',
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A brand identity project typically takes 4-6 weeks, web development ranges from 6-12 weeks, and ongoing marketing campaigns are structured monthly. We provide detailed timelines during our initial consultation.',
  },
  {
    id: 3,
    question: 'What is your pricing structure?',
    answer: 'We offer flexible pricing models including project-based fees, retainer packages, and custom solutions. Pricing is determined by project scope, deliverables, and timeline. Contact us for a personalized quote tailored to your specific needs.',
  },
  {
    id: 4,
    question: 'Do you work with international clients?',
    answer: 'Absolutely! We work with clients globally. Our team is experienced in remote collaboration and we use modern tools to ensure seamless communication across different time zones. We have successfully delivered projects for clients in Europe, North America, and the Middle East.',
  },
  {
    id: 5,
    question: 'What makes Bidayalab different from other agencies?',
    answer: 'We combine creative excellence with data-driven strategy. Our team brings together expertise in branding, development, marketing, and AI—all under one roof. This integrated approach ensures cohesive results and eliminates the need for multiple agency partnerships.',
  },
  {
    id: 6,
    question: 'How do we get started?',
    answer: 'Simply reach out through our contact form or book a free discovery call. We will discuss your goals, challenges, and vision. From there, we will propose a tailored strategy and roadmap to bring your project to life.',
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
          Questions?<br />
          <span className="text-[#beff01]">Answers.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 font-louis max-w-3xl"
        >
          Everything you need to know about working with us. Can not find what you are looking for? Let us talk.
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
              Still have questions?{" "}
              <span className="text-white">Let's clarify them.</span>
            </p>
            <a
              href="/contact"
              className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#beff01] text-black font-louis font-bold text-lg transition-all duration-300 hover:bg-white"
            >
              Get in Touch
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
