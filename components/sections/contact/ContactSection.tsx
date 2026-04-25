'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Loader2, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Globe, Layers, ArrowUpRight, Bot } from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { getSettings } from '@/app/actions/settings';
import { useLocale, t } from '@/lib/i18n';

const SERVICE_OPTIONS = [
  { id: 'ai-automation', icon: Bot, label: { en: 'AI Automation', fr: 'Automatisation IA' } },
  { id: 'web-dev', icon: Globe, label: { en: 'Web Engineering', fr: 'Ingénierie Web' } },
  { id: 'visual-storytelling', icon: Layers, label: { en: 'Brand & Motion', fr: 'Marque & Motion' } },
] as const;

export default function ContactSection() {
  const lang = useLocale();
  const c = {
    successTitleA: { en: 'Message', fr: 'Message' },
    successTitleB: { en: 'Received', fr: 'Reçu' },
    successBody: { en: "We've received your request and our team is already reviewing it. Expect a response at", fr: 'On a reçu votre demande et l’équipe l’examine déjà. Vous recevrez une réponse à' },
    successThanks: { en: 'Thank you', fr: 'Merci' },
    successSoon: { en: 'very soon.', fr: 'très vite.' },
    sendAnother: { en: 'Send Another Message', fr: 'Envoyer un autre message' },
    introTitleA: { en: "Let's Build", fr: 'On construit' },
    introTitleB: { en: 'The Future.', fr: 'l’avenir.' },
    introLead: { en: "Whether you need a cutting-edge web platform, an AI-powered tool, or a complete digital transformation, we're here to help.", fr: "Plateforme web sur-mesure, automatisation IA ou refonte digitale complète — on est là pour vous aider." },
    follow: { en: 'Follow Us', fr: 'Suivez-nous' },
    helpLabel: { en: 'What can we help you with?', fr: 'Comment peut-on vous aider ?' },
    detailsLabel: { en: 'Your Details', fr: 'Vos coordonnées' },
    namePh: { en: 'Your Name', fr: 'Votre nom' },
    bizPh: { en: 'Business Name', fr: 'Nom de l’entreprise' },
    emailPh: { en: 'Email Address', fr: 'Adresse e-mail' },
    phonePh: { en: 'Phone Number', fr: 'Téléphone' },
    moreLabel: { en: 'Tell us more', fr: 'Parlez-nous du projet' },
    msgPh: { en: 'Describe your project, goals, and timeline...', fr: 'Décrivez le projet, les objectifs et le planning...' },
    sending: { en: 'Sending...', fr: 'Envoi...' },
    submit: { en: 'Send Request', fr: 'Envoyer la demande' },
    chatLabel: { en: 'Chat with us', fr: 'Discuter avec nous' },
    emailLabel: { en: 'Email', fr: 'Email' },
    phoneLabel: { en: 'Phone', fr: 'Téléphone' },
    waLabel: { en: 'WhatsApp', fr: 'WhatsApp' },
  } as const;
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[], // Multi-select support
    website_url: '' // Honeypot
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [contactSettings, setContactSettings] = useState({
    email: "support@bidayalab.com",
    phone: "+212 751 388 901",
    whatsapp: "+212 751 388 901",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      if (data) {
        setContactSettings({
          email: data.email || "support@bidayalab.com",
          phone: data.phone || "+212 751 388 901",
          whatsapp: data.whatsapp || "+212 751 388 901",
          linkedinUrl: data.linkedinUrl || "https://linkedin.com",
          instagramUrl: data.instagramUrl || "https://instagram.com"
        });
      }
    };
    fetchSettings();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: t(lang, c.emailLabel),
      info: contactSettings.email,
      link: `mailto:${contactSettings.email}`,
      color: "group-hover:text-blue-400"
    },
    {
      icon: Phone,
      title: t(lang, c.phoneLabel),
      info: contactSettings.phone,
      link: `tel:${contactSettings.phone.replace(/\s+/g, '')}`,
      color: "group-hover:text-green-400"
    },
    {
      icon: FaWhatsapp,
      title: t(lang, c.waLabel),
      info: t(lang, c.chatLabel),
      link: `https://wa.me/${contactSettings.whatsapp.replace(/[^0-9]/g, '')}`,
      color: "group-hover:text-[#25D366]"
    }
  ];

  const socialLinks = [
    { icon: FaLinkedinIn, label: 'LinkedIn', link: contactSettings.linkedinUrl, color: 'hover:bg-[#0077b5]' },
    { icon: FaInstagram, label: 'Instagram', link: contactSettings.instagramUrl, color: 'hover:bg-[#E1306C]' },
    // Placeholder X/Twitter if needed, or stick to what's in settings
  ];

  const toggleService = (id: string) => {
    setFormData(prev => {
      const services = prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id];
      return { ...prev, services };
    });
  };

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
    setFormData({ name: '', businessName: '', email: '', phone: '', message: '', services: [], website_url: '' });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="relative pt-8 md:pt-16 pb-16 md:pb-24 overflow-visible">
      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">

        {/* Success State Overlay */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            >
              <div className="relative max-w-2xl w-full bg-[#0a0a0a] border border-white/5 p-12 md:p-16 text-center overflow-hidden shadow-[0_0_100px_rgba(190,255,1,0.1)]">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#beff01] to-transparent opacity-50" />
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#beff01]/5 rounded-full blur-[100px]" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" />

                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", duration: 0.8 }}
                  className="w-24 h-24 mx-auto bg-gradient-to-br from-[#beff01]/20 to-transparent rounded-full flex items-center justify-center mb-8 border border-[#beff01]/20 shadow-[0_0_30px_rgba(190,255,1,0.2)]"
                >
                  <Sparkles size={40} className="text-[#beff01]" />
                </motion.div>

                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-black font-louis text-white mb-6 uppercase tracking-tight"
                >
                  {t(lang, c.successTitleA)} <span className="text-[#beff01]">{t(lang, c.successTitleB)}</span>
                </motion.h3>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-zinc-400 text-lg md:text-xl mb-10 max-w-lg mx-auto font-light leading-relaxed"
                >
                  {t(lang, c.successThanks)} <span className="text-white font-medium">{formData.name}</span>. {t(lang, c.successBody)} <span className="text-[#beff01] underline decoration-[#beff01]/30 underline-offset-4">{formData.email}</span> {t(lang, c.successSoon)}
                </motion.p>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={resetForm}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold font-louis uppercase tracking-wider hover:bg-[#beff01] transition-all duration-300"
                >
                  <span>{t(lang, c.sendAnother)}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">

          {/* LEFT COLUMN: Context & Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-6 h-full"
          >
            {/* Intro Box */}
            <div className="p-8 rounded-none bg-zinc-900/30 border border-white/5 backdrop-blur-sm">
              <h2 className="text-3xl font-black font-louis text-white mb-4">{t(lang, c.introTitleA)}<br /><span className="text-[#beff01]">{t(lang, c.introTitleB)}</span></h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {t(lang, c.introLead)}
              </p>
            </div>

            {/* Contact Tiles */}
            <div className="flex flex-col gap-3 flex-1 justify-center">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.link}
                    className="group flex items-center gap-4 p-5 rounded-none bg-zinc-900/50 border border-white/5 hover:border-[#beff01]/30 hover:bg-zinc-800 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-none bg-black flex items-center justify-center text-zinc-500 group-hover:bg-[#beff01] group-hover:text-black transition-all`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold font-louis text-zinc-500 uppercase tracking-widest mb-0.5">{item.title}</p>
                      <p className="text-white font-medium group-hover:text-[#beff01] transition-colors">{item.info}</p>
                    </div>
                    <ArrowUpRight className="text-zinc-700 group-hover:text-white transition-colors" size={20} />
                  </Link>
                )
              })}
            </div>

            {/* Socials Row */}
            <div className="p-6 rounded-none bg-zinc-900/30 border border-white/5 flex flex-col gap-4">
              <p className="text-xs font-bold font-louis text-zinc-500 uppercase tracking-widest text-center">{t(lang, c.follow)}</p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-none bg-zinc-800 flex items-center justify-center text-white transition-all ${social.color} hover:scale-110`}
                      title={social.label}
                    >
                      <Icon size={20} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The "Project Planner" Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 h-full"
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-none bg-zinc-900/20 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col justify-between">
              {/* Glow Effect */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#beff01]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#beff01]/10 transition-colors duration-700" />

              <div className="relative z-10 space-y-10">
                {/* 1. Services Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold font-louis text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#beff01]" />
                    {t(lang, c.helpLabel)}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {SERVICE_OPTIONS.map((service) => {
                      const isSelected = formData.services.includes(service.id);
                      const Icon = service.icon;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`
                                                flex items-center gap-2 px-5 py-3 rounded-none border transition-all duration-300 text-sm font-medium
                                                ${isSelected
                              ? 'bg-[#beff01] border-[#beff01] text-black shadow-[0_0_20px_rgba(190,255,1,0.3)]'
                              : 'bg-black/30 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                            }
                                            `}
                        >
                          <Icon size={16} className={isSelected ? 'text-black' : 'text-zinc-500'} />
                          {t(lang, service.label)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. Basic Info */}
                <div className="space-y-4">
                  <label className="text-sm font-bold font-louis text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#beff01]" />
                    {t(lang, c.detailsLabel)}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="name"
                        placeholder={t(lang, c.namePh)}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-zinc-700 focus:outline-none focus:border-[#beff01] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="businessName"
                        placeholder={t(lang, c.bizPh)}
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-zinc-700 focus:outline-none focus:border-[#beff01] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        name="email"
                        placeholder={t(lang, c.emailPh)}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-zinc-700 focus:outline-none focus:border-[#beff01] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t(lang, c.phonePh)}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-zinc-700 focus:outline-none focus:border-[#beff01] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Project Details */}
                <div className="space-y-4">
                  <label className="text-sm font-bold font-louis text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#beff01]" />
                    {t(lang, c.moreLabel)}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t(lang, c.msgPh)}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-none p-6 text-white text-lg placeholder-zinc-700 focus:outline-none focus:border-[#beff01] focus:bg-black/40 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-none">
                    <AlertCircle size={20} />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative inline-flex items-center gap-3 px-8 py-5 bg-white text-black rounded-none font-black font-louis text-lg tracking-wide hover:bg-[#beff01] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:pr-10"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        <span>{t(lang, c.sending)}</span>
                      </>
                    ) : (
                      <>
                        <span>{t(lang, c.submit)}</span>
                        <div className="w-8 h-8 flex items-center justify-center rounded-none bg-black text-white group-hover:bg-black group-hover:text-[#beff01] transition-all group-hover:rotate-45">
                          <ArrowRight size={14} />
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}