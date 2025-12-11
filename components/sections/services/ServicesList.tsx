import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Megaphone, Camera, Bot, Layers, Globe, BarChart3, Aperture, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Palette,
    secondaryIcon: Layers,
    title: "Brand & Visual Identity",
    seoTitle: "Creative Studio",
    description: "We craft visual identities that tell your story. From logo design to full brand guidelines, we ensure your business looks professional and memorable across all platforms.",
    features: [
      "Graphic Design - Logo design, brand identity, visual branding",
      "Print Design - Business cards, brochures, flyers, packaging",
      "Social Media Graphics - Instagram posts, stories, promotional content",
      "Motion Graphics - Animated videos, logo animations, explainer videos",
      "Brand Strategy - Brand guidelines, color palettes, typography systems"
    ],
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    glowColor: "purple-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    accentColor: "#c084fc"
  },
  {
    icon: Code,
    secondaryIcon: Globe,
    title: "Web & Software Engineering",
    seoTitle: "Digital Development",
    description: "Robust, scalable, and high-performance digital solutions. We build custom websites and applications tailored to your specific business needs.",
    features: [
      "Web Development - Custom websites, web applications, landing pages",
      "E-commerce Solutions - Online stores, payment integration, shopping systems",
      "Automation Systems - Workflow automation, API integrations, custom tools",
      "UI/UX Design - User interface design, user experience optimization",
      "Web Maintenance - Updates, security, performance optimization"
    ],
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    glowColor: "blue-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    accentColor: "#60a5fa"
  },
  {
    icon: Megaphone,
    secondaryIcon: BarChart3,
    title: "Growth & Performance Marketing",
    seoTitle: "Digital Marketing",
    description: "Data-driven strategies to grow your audience and convert leads. We handle everything from paid ads to organic social media growth.",
    features: [
      "Paid Advertising - Google Ads, Facebook/Instagram Ads, LinkedIn Ads",
      "Social Media Management - Content planning, community management, engagement",
      "Content Creation - Copywriting, content calendars, hashtag strategy",
      "Analytics & Reporting - Campaign tracking, ROI analysis, performance reports",
      "SEO Optimization - Search engine optimization, keyword research, content strategy"
    ],
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    glowColor: "emerald-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    accentColor: "#34d399"
  },
  {
    icon: Camera,
    secondaryIcon: Aperture,
    title: "Cinematic Production & Photography",
    seoTitle: "Visual Storytelling",
    description: "Capturing moments that matter. High-quality photography and videography to showcase your products, events, and brand story.",
    features: [
      "Commercial Photography - Product shots, lifestyle photography, brand photography",
      "Event Coverage - Corporate events, conferences, behind-the-scenes",
      "Video Production - Promotional videos, testimonials, documentaries",
      "Drone Videography - Aerial shots, real estate tours, landscape footage",
      "Post-Production - Video editing, color grading, sound design, retouching"
    ],
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    glowColor: "orange-500",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    accentColor: "#fb923c"
  },
  {
    icon: Bot,
    secondaryIcon: Sparkles,
    title: "Artificial Intelligence & Automation",
    seoTitle: "AI & Automation",
    description: "Leverage the power of Artificial Intelligence to streamline operations and enhance customer experiences. Future-proof your business today.",
    features: [
      "AI Chatbots - Customer service bots, AI assistants, conversational AI",
      "GPT Integrations - ChatGPT API, content generation, AI writing tools",
      "Machine Learning Solutions - Predictive analytics, recommendation systems",
      "Workflow Automation - Business process automation, Zapier/Make integrations",
      "AI-Powered Apps - Custom AI applications, intelligent systems"
    ],
    gradient: "from-[#beff01]/20 via-yellow-500/10 to-transparent",
    glowColor: "yellow-500",
    iconBg: "bg-[#beff01]/10",
    iconColor: "text-[#beff01]",
    borderColor: "border-[#beff01]/30",
    accentColor: "#beff01"
  }
];

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header - Preserved as requested */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#beff01]/10 border border-[#beff01]/30 backdrop-blur-sm mb-8 group hover:bg-[#beff01]/20 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#beff01] animate-pulse" />
            <span className="text-[#beff01] text-sm font-bold uppercase tracking-wider">
              What We Offer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Digital Solutions
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Built For Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
          >
            From stunning websites to powerful marketing campaigns—We help businesses like yours
            stand out online and attract more customers.
          </motion.p>
        </motion.div>

        {/* Services Grid - Redesigned */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative h-full"
              >
                {/* Card Container */}
                <div className={`
                  relative h-full bg-zinc-900/40 backdrop-blur-md rounded-[2rem] p-8 
                  border border-white/5 overflow-hidden
                  transition-all duration-500 ease-out
                  ${isHovered ? 'border-white/10 translate-y-[-8px]' : ''}
                `}>

                  {/* Hover Gradient Background */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 
                    group-hover:opacity-20 transition-opacity duration-500
                  `} />

                  {/* Top Section: Icons & Badge */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className={`
                      w-14 h-14 rounded-2xl ${service.iconBg} 
                      flex items-center justify-center
                      border ${service.borderColor}
                      shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]
                      group-hover:scale-110 transition-transform duration-500
                    `}>
                      <IconComponent className={`w-7 h-7 ${service.iconColor}`} strokeWidth={2} />
                    </div>


                  </div>

                  {/* Content Section */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#beff01] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-4 border-t border-white/5 pt-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                          <span className="text-zinc-300 text-xs leading-relaxed">
                            <strong className="text-white font-medium">{feature.split(' - ')[0]}</strong>
                            <span className="text-zinc-500"> - {feature.split(' - ')[1]}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
                  <SecondaryIcon className={`
                    absolute -bottom-6 -right-6 w-32 h-32 text-white/5 
                    transform rotate-12 group-hover:rotate-0 group-hover:scale-110 
                    transition-all duration-700 ease-out
                  `} />
                </div>
              </motion.div>
            );
          })}
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