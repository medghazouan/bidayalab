'use client';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';

import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use React Query for better caching
  const { data, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch('/api/testimonials');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const testimonials = data || [];

  const loading = isLoading;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="h-12 w-32 bg-zinc-800 rounded mx-auto mb-6" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 md:py-32  overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#beff01]/5 to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#beff01] font-semibold tracking-wide">
            CLIENT STORIES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            What Clients Say
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mt-6">
            Don&apos;t just take our word for it. Here&apos;s what the businesses we&apos;ve worked
            with have to say about us.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#beff01]/20 via-green-500/20 to-[#beff01]/20 rounded-2xl blur-3xl opacity-30" />

          {/* Card */}
          <div className="relative bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 md:p-12 transition-all duration-300 group-hover:border-[#beff01]/30 group-hover:bg-zinc-900/80">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#beff01]/5 rounded-full blur-3xl opacity-50" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="relative space-y-6"
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#beff01]" />

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#beff01] text-[#beff01]"
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6">
                  {currentTestimonial.image ? (
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#beff01] to-green-400 flex items-center justify-center">
                      <span className="text-xl font-bold text-black">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-zinc-400 text-sm">
                      {currentTestimonial.position} @ {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="relative mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">
                {/* Prev Button */}
                <button
                  onClick={prevTestimonial}
                  className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-[#beff01]" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-[#beff01] w-10'
                          : 'bg-zinc-700 hover:bg-zinc-600 w-2'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextTestimonial}
                  className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-[#beff01]" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}