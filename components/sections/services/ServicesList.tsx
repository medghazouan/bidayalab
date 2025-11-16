import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Palette, Search, Megaphone, ShoppingCart } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "We build websites that actually work for you—not against you. Fast, modern, and designed to turn visitors into customers. No bloated code, no confusing interfaces. Just clean, professional websites that get the job done.",
    features: [
      "Lightning-fast loading times",
      "Mobile-first responsive design",
      "Built for search engines (SEO)",
      "Easy to update yourself"
    ],
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
    glowColor: "blue-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Marketing that drives real results. We don&apos;t just spend your budget—we invest it smartly to bring you paying customers. Facebook Ads, Google Ads, or organic growth—whatever works best for your business.",
    features: [
      "Targeted campaigns that convert",
      "Real-time performance tracking",
      "Audience research included",
      "Monthly reports you can understand"
    ],
    gradient: "from-green-500/20 via-green-500/10 to-transparent",
    glowColor: "green-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/30"
  },
  {
    icon: Palette,
    title: "Brand Design",
    description: "Your brand is more than just a logo—it&apos;s how people remember you. We create visual identities that make you stand out and build trust. From logos to complete brand kits, everything you need to look professional.",
    features: [
      "Custom logo that represents you",
      "Complete brand identity package",
      "Social media templates",
      "Print and digital materials"
    ],
    gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    glowColor: "purple-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Get found on Google when people search for what you offer. We optimize your website so you rank higher, get more traffic, and turn that traffic into customers. No shady tricks—just proven strategies that work.",
    features: [
      "Keyword research & strategy",
      "On-page optimization",
      "Technical SEO fixes",
      "Local SEO for your area"
    ],
    gradient: "from-yellow-500/20 via-yellow-500/10 to-transparent",
    glowColor: "yellow-500",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/30"
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description: "Stay active online without the stress. We handle your social media so you don&apos;t have to—creating posts, engaging with followers, and growing your audience while you focus on running your business.",
    features: [
      "Content creation & scheduling",
      "Consistent posting strategy",
      "Community engagement",
      "Growth tracking & analytics"
    ],
    gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
    glowColor: "pink-500",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    borderColor: "border-pink-500/30"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Want to sell online? We build online stores that make buying easy for your customers and managing easy for you. From product pages to checkout, everything optimized to maximize your sales.",
    features: [
      "Complete store setup",
      "Secure payment processing",
      "Inventory management",
      "Sales tracking & automation"
    ],
    gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
    glowColor: "orange-500",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30"
  },
];

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 text-center"
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-30`}
                  />
                )}

                {/* Card */}
                <div className={`
                  relative h-full bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 
                  border ${service.borderColor} 
                  transition-all duration-500
                  ${isHovered ? 'scale-105 border-opacity-100 shadow-2xl' : 'border-opacity-50'}
                `}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-50`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className={`
                        w-16 h-16 rounded-2xl ${service.iconBg} 
                        flex items-center justify-center
                        border ${service.borderColor}
                        shadow-lg
                        group-hover:shadow-xl
                        transition-all duration-300
                      `}>
                        <IconComponent className={`w-8 h-8 ${service.iconColor}`} strokeWidth={2.5} />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 group/item"
                        >
                          <div className={`
                            w-5 h-5 rounded-full ${service.iconBg} 
                            flex items-center justify-center flex-shrink-0 mt-0.5
                            border ${service.borderColor}
                            group-hover/item:scale-110 transition-transform
                          `}>
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient}`} />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed flex-1">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
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