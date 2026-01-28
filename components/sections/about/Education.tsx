'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const education = [
  {
    degree: "Diploma of Technicien Spécialisé in Development",
    institution: "OFPPT - Marrakech",
    year: "2018 - 2020",
    description: "Focused on full-stack web development, database management, and software engineering principles. Built multiple real-world projects during training.",
    icon: GraduationCap,
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400"
  },
  {
    degree: "Certifications in Digital Marketing",
    institution: "Google & Meta Blueprint",
    year: "2021",
    description: "Completed certifications in Google Ads, Facebook Ads Manager, and SEO fundamentals. Applied learning directly to client campaigns.",
    icon: Award,
    gradient: "from-[#beff01]/20 via-green-500/10 to-transparent",
    borderColor: "border-[#beff01]/30",
    iconBg: "bg-[#beff01]/10",
    iconColor: "text-[#beff01]"
  },
  {
    degree: "Self-Taught in Modern Web Development",
    institution: "Online (Udemy, YouTube, Documentation)",
    year: "2020 - Present",
    description: "Constantly learning new technologies like Next.js, TypeScript, and modern design patterns. Staying up-to-date is part of the job.",
    icon: BookOpen,
    gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400"
  },
];

export default function Education() {
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
              Knowledge Base
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            Education &
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Continuous Learning
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-20"
          >
            I&apos;m a big believer in continuous learning. Here&apos;s where I got my formal education—
            and where I keep learning every single day.
          </motion.p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${edu.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {/* Card */}
              <div className={`relative h-full bg-zinc-900/50 backdrop-blur-sm border ${edu.borderColor} border-opacity-50 rounded-3xl p-8 transition-all duration-300 group-hover:border-opacity-100 overflow-hidden`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-50`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className={`w-16 h-16 ${edu.iconBg} rounded-2xl flex items-center justify-center border ${edu.borderColor} group-hover:shadow-lg transition-all`}>
                      <edu.icon className={`w-8 h-8 ${edu.iconColor}`} strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">{edu.degree}</h3>
                  <p className="text-base font-bold text-gray-300 mb-2">{edu.institution}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#beff01]" />
                    <span className="text-xs font-semibold text-gray-400">{edu.year}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{edu.description}</p>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${edu.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
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