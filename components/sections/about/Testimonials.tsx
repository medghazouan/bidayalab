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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use React Query for better caching
  const { data, isLoading } = useQuery<Testimonial[]>({
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
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="relative py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#beff01] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              Client Stories
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            What Clients
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Say About Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-20"
          >
            Don&apos;t just take my word for it. Here&apos;s what people I&apos;ve worked with have to say.
          </motion.p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#beff01]/20 via-blue-500/10 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Card */}
              <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-10 md:p-16 overflow-hidden hover:border-[#beff01]/30 transition-all">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #beff01 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Quote Icon */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 opacity-10"
                >
                  <Quote className="w-24 h-24 text-[#beff01]" strokeWidth={3} />
                </motion.div>

                <div className="relative z-10">
                  {/* Stars */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex gap-1 mb-8"
                  >
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-6 h-6 fill-[#beff01] text-[#beff01]" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-10 font-light"
                  >
                    "{currentTestimonial.content}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-5"
                  >
                    {currentTestimonial.image ? (
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 bg-[#beff01] rounded-full blur-lg opacity-30" />
                        <Image
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          width={64}
                          height={64}
                          className="relative rounded-full object-cover border-2 border-[#beff01]/50"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#beff01] rounded-full blur-lg opacity-30" />
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#beff01]/20 to-[#beff01]/5 flex items-center justify-center border-2 border-[#beff01]/50">
                          <span className="text-[#beff01] font-black text-2xl">
                            {currentTestimonial.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="font-black text-white text-xl mb-1">{currentTestimonial.name}</p>
                      <p className="text-sm text-gray-400 font-medium">
                        {currentTestimonial.position} <span className="text-[#beff01]">@</span> {currentTestimonial.company}
                      </p>
                    </div>
                    <div className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 bg-[#beff01]/10 rounded-full border border-[#beff01]/30">
                      <Sparkles className="w-4 h-4 text-[#beff01]" />
                      <span className="text-[#beff01] font-bold text-sm">Verified Client</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-14 h-14 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center hover:border-[#beff01]/50 hover:bg-zinc-800/50 transition-all backdrop-blur-xl group"
              >
                <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-[#beff01] transition-colors" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-3">
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
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-14 h-14 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center hover:border-[#beff01]/50 hover:bg-zinc-800/50 transition-all backdrop-blur-xl group"
              >
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#beff01] transition-colors" />
              </motion.button>
            </motion.div>
          )}
        </div>
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
    </section>
  );
}