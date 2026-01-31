'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Loader2, CheckCircle2, AlertCircle, Sparkles, User, MessageSquare, Smartphone, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { getSettings } from '@/app/actions/settings';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website_url: '' // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [contactSettings, setContactSettings] = useState({
    email: "bidayalab1@gmail.com",
    phone: "+212 751 388 901",
    whatsapp: "+212 751 388 901"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      if (data) {
        setContactSettings({
          email: data.email || "bidayalab1@gmail.com",
          phone: data.phone || "+212 751 388 901",
          whatsapp: data.whatsapp || "+212 751 388 901"
        });
      }
    };
    fetchSettings();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: contactSettings.email,
      link: `mailto:${contactSettings.email}`,
    },
    {
      icon: Phone,
      title: 'Phone',
      info: contactSettings.phone,
      link: `tel:${contactSettings.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      info: contactSettings.whatsapp,
      link: `https://wa.me/${contactSettings.whatsapp.replace(/[^0-9]/g, '')}`,
    }
  ];

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
    setFormData({ name: '', email: '', phone: '', message: '', website_url: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="relative pt-24 md:pt-36 lg:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">

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
            {/* Standardized Left-Aligned Header - Max Right Alignment */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
                  Get In Touch
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight"
                >
                  LET'S BUILD<br />
                  <span className="text-[#beff01]">SOMETHING NEW</span>
                </motion.h1>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 lg:text-right lg:pb-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-zinc-400 leading-relaxed ml-auto"
                >
                  Have a vision? We have the team to build it. Fill out the form or reach out directly to start the conversation.
                </motion.p>
              </div>
            </div>

            {/* Contact Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 overflow-visible">

              {/* Left Column: Info Tiles */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-5 flex flex-col gap-6 h-full"
              >
                {/* Trust Signal Box */}
                <div className="flex-1 p-8 rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-sm relative overflow-hidden group flex flex-col justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#beff01]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#beff01]/10 flex items-center justify-center text-[#beff01] mb-6 border border-[#beff01]/20">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">Quick Response</h3>
                    <p className="text-zinc-400 leading-relaxed font-medium">
                      I personally review every message. You can expect a response within <span className="text-white font-bold">24 hours</span>, usually much sooner.
                    </p>
                  </div>
                </div>

                {/* Contact Methods Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    // Email takes full width (col-span-2), others take 1
                    const isEmail = item.title === 'Email';
                    return (
                      <a
                        key={index}
                        href={item.link}
                        target={item.title === 'WhatsApp' ? '_blank' : undefined}
                        rel={item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                        className={`${isEmail ? 'col-span-2' : 'col-span-1'} group relative p-6 rounded-[2rem] bg-zinc-900/50 border border-white/10 hover:border-[#beff01]/50 hover:bg-[#beff01] transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[160px]`}
                      >
                        <div className="relative z-10 flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-full bg-white/5 text-zinc-400 group-hover:bg-black/10 group-hover:text-black transition-colors`}>
                            <Icon size={24} />
                          </div>
                          <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                        </div>

                        <div className="relative z-10">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black/60 mb-1">{item.title}</h4>
                          <p className={`font-bold text-white group-hover:text-black truncate ${isEmail ? 'text-xl' : 'text-lg'}`}>
                            {item.info}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Column: The Form */}
              <motion.div
                id="contact-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="h-full rounded-[2.5rem] bg-zinc-900/30 border border-white/10 p-6 md:p-10 backdrop-blur-md relative overflow-hidden">
                  {/* Header */}
                  <div className="mb-8 border-b border-white/5 pb-8">
                    <h3 className="text-3xl font-black text-white mb-2">Send a Message</h3>
                    <p className="text-zinc-400">Let's discuss how we can help your business grow.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="group space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-4 group-focus-within:text-[#beff01] transition-colors">Name</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-[#beff01] transition-colors" />
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={status === 'loading'}
                            className="w-full pl-14 pr-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#beff01] focus:bg-black/40 transition-all placeholder-zinc-700 font-medium"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="group space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-4 group-focus-within:text-[#beff01] transition-colors">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-[#beff01] transition-colors" />
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={status === 'loading'}
                            className="w-full pl-14 pr-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#beff01] focus:bg-black/40 transition-all placeholder-zinc-700 font-medium"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="group space-y-2">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-4 group-focus-within:text-[#beff01] transition-colors">Phone</label>
                      <div className="relative">
                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-[#beff01] transition-colors" />
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={status === 'loading'}
                          className="w-full pl-14 pr-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#beff01] focus:bg-black/40 transition-all placeholder-zinc-700 font-medium"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="group space-y-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-4 group-focus-within:text-[#beff01] transition-colors">Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-zinc-600 group-focus-within:text-[#beff01] transition-colors" />
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required disabled={status === 'loading'} rows={5}
                          className="w-full pl-14 pr-6 py-5 bg-black/20 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#beff01] focus:bg-black/40 transition-all placeholder-zinc-700 font-medium resize-none leading-relaxed"
                          placeholder="Tell us about your project goals..."
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">{errorMessage || 'Something went wrong. Please try again.'}</p>
                      </motion.div>
                    )}

                    {/* Honeypot Field - Hidden */}
                    <input type="text" name="website_url" value={(formData as any).website_url} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

                    {/* Submit Button */}
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full py-5 bg-[#beff01] text-black font-black text-lg uppercase tracking-widest rounded-2xl hover:bg-[#a8e600] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg shadow-[#beff01]/10"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Send Message</span>
                          <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </>
                      )}
                    </button>
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