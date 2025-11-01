'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';

const experiences = [
  {
    role: "Freelance Web Developer & Digital Marketer",
    company: "Self-Employed",
    location: "Marrakech, Morocco",
    period: "2022 - Present",
    description: "Building custom websites and running digital marketing campaigns for local and international clients. Helped 20+ businesses grow their online presence and revenue.",
    skills: ["Next.js", "React", "Facebook Ads", "Google Ads", "SEO", "Branding"],
    gradient: "from-[#beff01]/20 via-green-500/10 to-transparent",
    borderColor: "border-[#beff01]/30"
  },
  {
    role: "Brand Manager",
    company: "Local Agency",
    location: "Marrakech, Morocco",
    period: "2020 - 2022",
    description: "Managed brand strategy, social media campaigns, and content creation for multiple clients. Focused on growing engagement and driving sales through targeted marketing.",
    skills: ["Social Media Marketing", "Content Strategy", "Graphic Design", "Client Management"],
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
    borderColor: "border-blue-500/30"
  },
  {
    role: "Junior Developer",
    company: "Tech Startup",
    location: "Remote",
    period: "2019 - 2020",
    description: "Started my journey in web development, learning the ropes and building real-world projects. This is where I fell in love with coding.",
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    borderColor: "border-purple-500/30"
  },
];

export default function Experience() {
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
              Career Path
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-none"
          >
            My Journey
            <br />
            <span className="bg-gradient-to-r from-[#beff01] via-[#d4ff4d] to-[#beff01] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              So Far
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-20"
          >
            Here's a quick rundown of my journey so far. Each role taught me something valuable 
            that I use every day to help my clients succeed.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {/* Card */}
              <div className={`relative bg-zinc-900/50 backdrop-blur-sm border ${exp.borderColor} border-opacity-50 rounded-3xl p-8 md:p-10 transition-all duration-300 group-hover:border-opacity-100 overflow-hidden`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-30`} />
                
                {/* Timeline Indicator */}
                <div className="absolute -left-0 top-10 w-1 h-20 bg-[#beff01] hidden lg:block" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-[#beff01]/10 flex items-center justify-center border border-[#beff01]/30">
                          <Briefcase className="w-6 h-6 text-[#beff01]" />
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tight">{exp.role}</h3>
                      </div>
                      <p className="text-xl text-gray-300 font-bold mb-4">{exp.company}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="hidden lg:block">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center group-hover:bg-[#beff01]/10 transition-colors border border-zinc-700 group-hover:border-[#beff01]/30">
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#beff01] transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6 text-lg">{exp.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ scale: 1.1 }}
                        className="text-sm font-bold bg-[#beff01]/10 text-[#beff01] px-4 py-2 rounded-full border border-[#beff01]/30 hover:bg-[#beff01]/20 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${exp.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
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