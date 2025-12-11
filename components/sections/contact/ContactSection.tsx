'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Loader2, CheckCircle2, AlertCircle, Sparkles, User, MessageSquare, Smartphone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    info: 'bidayalab1@gmail.com',
    link: 'mailto:bidayalab1@gmail.com',
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    icon: Phone,
    title: 'Phone',
    info: '0751388901',
    link: 'tel:0751388901',
    gradient: 'from-green-500/20 via-green-500/10 to-transparent',
    borderColor: 'border-green-500/30',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400'
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    info: '0751388901',
    link: 'https://wa.me/0751388901',
    gradient: 'from-green-500/20 via-green-500/10 to-transparent',
    borderColor: 'border-green-500/30',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400'
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="relative pt-24 md:pt-36 lg:pt-40 pb-16 md:pb-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* Success State */}
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mx-auto max-w-3xl"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#beff01]/20 via-green-500/10 to-[#beff01]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-3xl border border-[#beff01]/20 bg-zinc-900/50 p-12 md:p-16 text-center backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                  className="relative w-24 h-24 mx-auto mb-8"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#beff01] to-[#8bc500] opacity-20 blur-2xl animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#beff01]/20 to-transparent border-4 border-[#beff01] flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-[#beff01]" strokeWidth={3} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    Message Received!
                  </h2>
                  <p className="text-xl text-gray-300 mb-4">
                    Hey <span className="text-[#beff01] font-bold">{formData.name.split(' ')[0]}</span>, thank you for reaching out!
                  </p>
                  <p className="text-gray-400 leading-relaxed text-lg mb-10">
                    Your message just landed in my inbox, and I&apos;m genuinely excited to read it.
                    I&apos;ll get back to you at <strong className="text-[#beff01]">{formData.email}</strong> within 24 hours.
                  </p>

                  {/* What's Next Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-10">
                    <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#beff01]/10 flex items-center justify-center border border-[#beff01]/30">
                        <CheckCircle2 className="w-6 h-6 text-[#beff01]" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">Quick Response</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">I&apos;ll personally review your message within 24 hours</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#beff01]/10 flex items-center justify-center border border-[#beff01]/30">
                        <Mail className="w-6 h-6 text-[#beff01]" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">Direct Contact</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        You&apos;ll hear back via email or WhatsApp
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#beff01]/10 flex items-center justify-center border border-[#beff01]/30">
                        <Sparkles className="w-6 h-6 text-[#beff01]" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">Let&apos;s Build</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">We&apos;ll discuss how to bring your vision to life</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-8">
                    In the meantime, check out my{' '}
                    <Link href="/works" className="text-[#beff01] font-bold hover:underline">
                      recent projects
                    </Link>
                  </p>

                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header - Preserved Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
                <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
                  Get In Touch
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tight leading-none"
              >
                Let&apos;s Build
                <br />
                <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Something Amazing
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-10 sm:mb-16 md:mb-20"
              >
                Have a project in mind? Drop me a message and let&apos;s create something amazing together.
                I typically respond within 24 hours.
              </motion.p>
            </motion.div>

            {/* Contact Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
              {/* Left: Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <a
                        href={item.link}
                        target={item.title === 'WhatsApp' ? '_blank' : undefined}
                        rel={item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                        className={`relative flex items-start gap-4 sm:gap-5 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border ${item.borderColor} bg-zinc-900/50 backdrop-blur-sm hover:border-opacity-100 transition-all duration-300`}
                      >
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl ${item.iconBg} flex items-center justify-center flex-shrink-0 border ${item.borderColor} group-hover:scale-110 transition-transform`}>
                          {item.title === 'WhatsApp' ? (
                            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${item.iconColor}`} />
                          ) : (
                            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${item.iconColor}`} strokeWidth={2.5} />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                            {item.title}
                          </h3>
                          <p className={`text-lg sm:text-xl font-black text-white group-hover:${item.iconColor} transition-colors`}>
                            {item.info}
                          </p>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}

                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#beff01]/10 to-transparent border border-[#beff01]/20 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-black text-white mb-3">Quick Response Guaranteed</h3>
                  <p className="text-gray-400 leading-relaxed">
                    I personally read and respond to every message. Expect to hear back within 24 hours,
                    often much sooner!
                  </p>
                </motion.div>
              </motion.div>

              {/* Right: Modern Contact Form */}
              <motion.div
                id="contact-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative group"
              >
                {/* Decorative Form Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/5 via-purple-500/5 to-blue-500/5 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                    <p className="text-zinc-400 text-sm">Fill out the form below and I&apos;ll get back to you shortly.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <div className={`relative group transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#beff01] transition-colors">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={status === 'loading'}
                          className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#beff01]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#beff01]/20 transition-all duration-300"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#beff01] transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={status === 'loading'}
                          className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#beff01]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#beff01]/20 transition-all duration-300"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                      <div className={`relative group transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#beff01] transition-colors">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          disabled={status === 'loading'}
                          className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#beff01]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#beff01]/20 transition-all duration-300"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-2">
                      <div className={`relative group transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                        <div className="absolute left-4 top-6 text-zinc-500 group-focus-within:text-[#beff01] transition-colors">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          disabled={status === 'loading'}
                          rows={5}
                          className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#beff01]/50 focus:bg-black/60 focus:ring-1 focus:ring-[#beff01]/20 transition-all duration-300 resize-none"
                          placeholder="Tell me about your project..."
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">
                          {errorMessage || 'Something went wrong. Please try again.'}
                        </p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      className="relative w-full py-5 bg-[#beff01] hover:bg-[#a8e600] text-black font-black text-lg rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(190,255,1,0.2)] hover:shadow-[0_0_30px_rgba(190,255,1,0.4)] overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                          <span className="relative z-10">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          <span className="relative z-10">Send Message</span>
                        </>
                      )}
                    </motion.button>

                    {/* Privacy Note */}
                    <p className="text-xs text-center text-zinc-500">
                      Your information is secure and will never be shared.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </>
        )}
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