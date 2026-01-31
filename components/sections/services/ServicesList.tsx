import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Megaphone, Camera, Bot, Layers, Globe, BarChart3, Aperture, Sparkles } from 'lucide-react';
import { SiAdobeillustrator, SiAdobephotoshop, SiFigma, SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiGoogleads, SiMeta, SiInstagram, SiTiktok, SiDavinciresolve, SiAdobepremierepro, SiOpenai, SiZapier, SiPython } from "react-icons/si";
import { FaGoogle, FaPenNib } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const services = [
  {
    id: "digital-development",
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
    techStack: [
      { icon: SiReact, name: "React" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiTailwindcss, name: "Tailwind" },
      { icon: SiNodedotjs, name: "Node.js" }
    ],
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    glowColor: "blue-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    accentColor: "#60a5fa"
  },
  {
    id: "ai-automation",
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
    techStack: [
      { icon: SiOpenai, name: "OpenAI" },
      { icon: SiPython, name: "Python" },
      { icon: SiZapier, name: "Zapier" },
      { icon: Bot, name: "LLMs" }
    ],
    gradient: "from-[#beff01]/20 via-yellow-500/10 to-transparent",
    glowColor: "yellow-500",
    iconBg: "bg-[#beff01]/10",
    iconColor: "text-[#beff01]",
    borderColor: "border-[#beff01]/30",
    accentColor: "#beff01"
  },
  {
    id: "creative-content",
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
    techStack: [
      { icon: SiDavinciresolve, name: "DaVinci" },
      { icon: SiAdobepremierepro, name: "Premiere" },
      { icon: SiAdobephotoshop, name: "Lightroom" },
      { icon: Camera, name: "Sony Alpha" }
    ],
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    glowColor: "orange-500",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    accentColor: "#fb923c"
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

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Creative Section Header - Max Right Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#beff01]" />
              Our Capabilities
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tight"
            >
              DIGITAL<br />
              <span className="text-[#beff01]">SOLUTIONS</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:text-right lg:pb-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 leading-relaxed ml-auto"
            >
              We build <span className="text-white font-medium">revenue-generating ecosystems</span>.
              From high-performance code to psychology-driven design, every pixel serves a purpose.
            </motion.p>
          </div>
        </div>

        {/* Services Grid - Creative Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            const isHovered = hoveredIndex === index;

            // Bento Grid Logic
            // First row: 7/5 split
            // Second row: 5/7 split
            // Third row: Full width or centered
            let colSpan = "md:col-span-12 lg:col-span-4"; // Default third
            if (index === 0) colSpan = "md:col-span-12 lg:col-span-7"; // Brand - Wide
            if (index === 1) colSpan = "md:col-span-12 lg:col-span-5"; // Web - Narrower
            if (index === 2) colSpan = "md:col-span-12 lg:col-span-5"; // Growth - Narrower
            if (index === 3) colSpan = "md:col-span-12 lg:col-span-7"; // Content - Wide
            if (index === 4) colSpan = "md:col-span-12 lg:col-span-12"; // AI - Full width statement

            return (
              <motion.div
                key={index}
                // @ts-ignore
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative h-full scroll-mt-32 ${colSpan}`}
              >
                {/* Card Container */}
                <div className={`
                  relative h-full bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10
                  border border-white/5 overflow-hidden
                  transition-all duration-500 ease-out
                  ${isHovered ? 'border-white/10 translate-y-[-4px] shadow-2xl shadow-black/50' : ''}
                `}>

                  {/* Hover Gradient Background */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 
                    group-hover:opacity-10 transition-opacity duration-700
                  `} />

                  {/* Subtle Noise Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  {/* Top Section: Icons & Badge */}
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className={`
                      w-16 h-16 rounded-2xl ${service.iconBg} 
                      flex items-center justify-center
                      border ${service.borderColor}
                      shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]
                      group-hover:scale-110 transition-transform duration-500
                    `}>
                      <IconComponent className={`w-8 h-8 ${service.iconColor}`} strokeWidth={1.5} />
                    </div>

                    <div className="hidden md:flex px-3 py-1 rounded-full border border-white/5 bg-black/20 text-xs font-medium text-zinc-400">
                      {service.seoTitle}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-[#beff01] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                          <span className="text-zinc-300 text-sm font-medium">
                            {feature.split(' - ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack - Modern Grid */}
                    <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#beff01]/70 mr-2">
                        Powered By
                      </span>
                      {service.techStack.map((tech, i) => (
                        <div key={i} className="relative group/icon w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                          <tech.icon className="w-4 h-4 text-zinc-400 group-hover/icon:text-white" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
                  <SecondaryIcon className={`
                    absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.02] 
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

        @keyframes scan-fast {
            0% { left: -100%; }
            100% { left: 200%; }
        }

        .group:hover .group-hover\:animate-scan-fast {
            animation: scan-fast 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
}