'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, AlertCircle, Sparkles, Clock, Shield, Zap } from 'lucide-react';
import { PricingPlan } from './PricingSection';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

export default function OrderModal({ isOpen, onClose, plan }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
        setErrorMessage('');
      }, 300);
    }
  }, [isOpen]);

  // Enhanced body scroll lock and navbar hiding
  useEffect(() => {
    const navbar = document.querySelector('nav');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    if (isOpen) {
      // Hide navbar
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
      
      // Lock body scroll and compensate for scrollbar width
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Also lock html element scroll
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Show navbar
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      // Cleanup
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          planId: plan._id,
          plan: plan.name,
          price: plan.price,
          currency: plan.currency
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full Screen Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100000]"
            style={{ margin: 0, padding: 0 }}
          />

          {/* Modal Container - Scrollable */}
          <div 
            className="fixed inset-0 z-[100001] overflow-y-auto"
            style={{ 
              margin: 0, 
              padding: 0,
              scrollbarWidth: 'thin',
              scrollbarColor: '#beff01 #18181b'
            }}
          >
            <style jsx global>{`
              /* Hide page scrollbar when modal is open */
              body.modal-open {
                overflow: hidden !important;
                padding-right: 0 !important;
              }
              
              /* Custom scrollbar for modal */
              .fixed.inset-0.z-\\[100001\\]::-webkit-scrollbar {
                width: 8px;
              }
              .fixed.inset-0.z-\\[100001\\]::-webkit-scrollbar-track {
                background: #18181b;
              }
              .fixed.inset-0.z-\\[100001\\]::-webkit-scrollbar-thumb {
                background: #beff01;
                border-radius: 4px;
              }
              .fixed.inset-0.z-\\[100001\\]::-webkit-scrollbar-thumb:hover {
                background: #a8e600;
              }
            `}</style>
            
            <div className="min-h-full flex items-center justify-center p-4 py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-zinc-800/50 rounded-3xl max-w-6xl w-full overflow-hidden shadow-2xl shadow-[#beff01]/10"
              >
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#beff01]/20 via-transparent to-[#beff01]/20 opacity-50 blur-xl" />
                
                {/* Close Button - Always Visible */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center justify-center transition-colors z-[100002] group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>

                {status === 'success' ? (
                  <div className="relative p-12 md:p-20 text-center">
                    {/* Success Animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                      className="relative w-32 h-32 mx-auto mb-8"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#beff01] to-[#8bc500] opacity-20 blur-2xl animate-pulse" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#beff01]/20 to-transparent border-4 border-[#beff01] flex items-center justify-center">
                        <CheckCircle2 className="w-16 h-16 text-[#beff01]" strokeWidth={3} />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-5xl font-black text-white mb-6 tracking-tight">
                        Order Received!
                      </h3>
                      <p className="text-2xl text-gray-300 mb-4">
                        Thanks, <span className="text-[#beff01] font-bold">{formData.name}</span>! 
                      </p>
                      <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg mb-10">
                        I&apos;ve received your order for the <strong className="text-white">{plan.name}</strong> plan. 
                        I&apos;ll reach out to you at <strong className="text-[#beff01]">{formData.email}</strong> within 24 hours 
                        to get everything set up.
                      </p>

                      <div className="max-w-2xl mx-auto p-8 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 backdrop-blur-sm">
                        <div className="flex items-start gap-4 text-left">
                          <div className="w-12 h-12 rounded-xl bg-[#beff01]/10 flex items-center justify-center flex-shrink-0 border border-[#beff01]/30">
                            <Sparkles className="w-6 h-6 text-[#beff01]" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-lg mb-2">What&apos;s next?</p>
                            <p className="text-gray-400 leading-relaxed">
                              Check your email for a confirmation, and I&apos;ll be in touch soon to discuss the details and get your project started!
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="relative grid lg:grid-cols-5">
                    {/* LEFT SIDE - Ultra Modern Plan Display */}
                    <div className="lg:col-span-2 p-8 md:p-12 bg-gradient-to-br from-[#beff01]/10 via-transparent to-transparent border-r border-zinc-800/50 flex flex-col justify-between relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, #beff01 1px, transparent 0)',
                          backgroundSize: '40px 40px'
                        }} />
                      </div>

                      <div className="relative">
                        {/* Plan Badge */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 mb-6"
                        >
                          <Sparkles className="w-4 h-4 text-[#beff01]" />
                          <span className="text-[#beff01] font-bold text-sm uppercase tracking-wider">Selected Plan</span>
                        </motion.div>

                        {/* Plan Name */}
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
                        >
                          {plan.name}
                        </motion.h2>

                        {/* Tagline */}
                        {plan.tagline && (
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed"
                          >
                            {plan.tagline}
                          </motion.p>
                        )}

                        {/* Price Display */}
                        {plan.price ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-10"
                          >
                            <div className="flex items-baseline gap-3 mb-3">
                              <span className="text-7xl font-black text-[#beff01] tracking-tight">{plan.price}</span>
                              <span className="text-3xl text-gray-400 font-bold">{plan.currency || 'USD'}</span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">One-time investment</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-10"
                          >
                            <div className="mb-3">
                              <span className="text-5xl font-black text-[#beff01] tracking-tight">Custom</span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Pricing based on your needs</p>
                          </motion.div>
                        )}

                        {/* Features Highlight */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="space-y-4"
                        >
                          <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#beff01]" />
                            What&apos;s Included
                          </h4>
                          <div className="space-y-3">
                            {plan.features.slice(0, 5).map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full bg-[#beff01]/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#beff01]/30">
                                  <CheckCircle2 className="w-3 h-3 text-[#beff01]" />
                                </div>
                                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                              </motion.div>
                            ))}
                            {plan.features.length > 5 && (
                              <p className="text-[#beff01] text-sm font-semibold pl-8">
                                + {plan.features.length - 5} more features
                              </p>
                            )}
                          </div>
                        </motion.div>
                      </div>

                      {/* Bottom Info Cards */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-3 mt-8"
                      >
                        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-[#beff01]" />
                            <div>
                              <p className="text-white font-semibold text-sm">Quick Response</p>
                              <p className="text-gray-400 text-xs">Reply within 24 hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-[#beff01]" />
                            <div>
                              <p className="text-white font-semibold text-sm">Secure Payment</p>
                              <p className="text-gray-400 text-xs">Your data is protected</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* RIGHT SIDE - Modern Form */}
                    <div className="lg:col-span-3 p-8 md:p-12 relative">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Let&apos;s Get Started</h3>
                        <p className="text-gray-400 mb-8">Fill in your details and I&apos;ll be in touch shortly</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Name Input */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              disabled={loading}
                              className="w-full px-5 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#beff01] focus:ring-2 focus:ring-[#beff01]/20 transition-all disabled:opacity-50 backdrop-blur-sm"
                              placeholder="John Doe"
                            />
                          </motion.div>

                          {/* Email Input */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              disabled={loading}
                              className="w-full px-5 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#beff01] focus:ring-2 focus:ring-[#beff01]/20 transition-all disabled:opacity-50 backdrop-blur-sm"
                              placeholder="john@example.com"
                            />
                          </motion.div>

                          {/* Phone Input */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <label htmlFor="phone" className="block text-sm font-bold text-white mb-3">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              disabled={loading}
                              className="w-full px-5 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#beff01] focus:ring-2 focus:ring-[#beff01]/20 transition-all disabled:opacity-50 backdrop-blur-sm"
                              placeholder="+212 600 000 000"
                            />
                          </motion.div>

                          {/* Message Textarea */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <label htmlFor="message" className="block text-sm font-bold text-white mb-3">
                              Project Details (Optional)
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              disabled={loading}
                              rows={4}
                              className="w-full px-5 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#beff01] focus:ring-2 focus:ring-[#beff01]/20 transition-all resize-none disabled:opacity-50 backdrop-blur-sm"
                              placeholder="Tell me more about your project goals and requirements..."
                            />
                          </motion.div>

                          {/* Error Message */}
                          {status === 'error' && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 p-5 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm"
                            >
                              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                              <p className="text-red-400 font-medium">{errorMessage}</p>
                            </motion.div>
                          )}

                          {/* Submit Button */}
                          <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="relative w-full py-5 bg-gradient-to-r from-[#beff01] to-[#a8e600] text-black font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#beff01]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#a8e600] to-[#beff01] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex items-center gap-3">
                              {loading ? (
                                <>
                                  <Loader2 className="w-6 h-6 animate-spin" />
                                  <span className="text-lg">Submitting Order...</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-lg">Submit Order</span>
                                  <Sparkles className="w-5 h-5" />
                                </>
                              )}
                            </span>
                          </motion.button>

                          {/* Privacy Note */}
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xs text-center text-gray-500 leading-relaxed"
                          >
                            By submitting this form, you agree that I&apos;ll contact you about this order. 
                            Your information is secure and will never be shared.
                          </motion.p>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}