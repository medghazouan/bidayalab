'use client';

import { motion } from 'framer-motion';

import { ArrowRight } from 'lucide-react';

const services = [

  {
    role: 'Web Development',
    company: 'Development Service',
    location: 'Marrakech, Morocco',
    period: '2020 - Present',
    description:
      'Full-stack development using modern technologies like Next.js, React, and Node.js. We build fast, scalable applications that solve real business problems.',
    skills: ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'System Design'],
    gradient: 'from-[#beff01]/20 via-green-500/10 to-transparent',
    borderColor: 'border-[#beff01]/30',
  },

  {
    role: 'Digital Marketing',
    company: 'Marketing Service',
    location: 'Marrakech, Morocco',
    period: '2021 - Present',
    description:
      'Strategic campaigns across Google Ads, Facebook Ads, and SEO. We drive qualified traffic and conversions that translate to real business growth.',
    skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Strategy', 'Conversion Optimization'],
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    borderColor: 'border-blue-500/30',
  },

  {
    role: 'UI/UX Design',
    company: 'Design Service',
    location: 'Marrakech, Morocco',
    period: '2020 - Present',
    description:
      'Beautiful, user-centered designs that not only look great but drive conversions. Every pixel serves a purpose.',
    skills: ['Figma', 'UI Design', 'UX Research', 'Branding', 'Design Systems'],
    gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
    borderColor: 'border-purple-500/30',
  },

];

export default function Services() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#beff01]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#beff01] font-semibold tracking-wide">
            SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            What We Offer
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mt-6">
            Here&apos;s a quick rundown of our services. Each service is backed by years of
            experience and proven results.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100`}
              />

              {/* Card */}
              <div
                className={`relative bg-zinc-900/50 backdrop-blur border ${service.borderColor} rounded-xl p-8 transition-all duration-300 group-hover:bg-zinc-900/80`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none`}
                />

                {/* Timeline Indicator */}
                <div className="absolute left-8 top-6 w-3 h-3 rounded-full border-2 border-[#beff01] bg-black" />

                <div className="relative pl-8 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {service.role}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#beff01] font-semibold">
                        {service.company}
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-400">{service.period}</span>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2">📍 {service.location}</p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex items-center gap-2 text-[#beff01] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700/50 hover:border-[#beff01]/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-1 h-8 bg-gradient-to-b from-[#beff01] to-transparent rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}