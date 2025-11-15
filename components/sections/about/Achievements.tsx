'use client';

import { motion } from 'framer-motion';

import { TrendingUp, Users, Zap } from 'lucide-react';

const achievements = [

  {
    degree: 'Projects Completed',
    institution: 'Across All Industries',
    year: '50+',
    description:
      'Successfully delivered across various industries and scales. From e-commerce to SaaS platforms, we bring expertise to every project.',
    icon: TrendingUp,
    gradient: 'from-green-500/20 via-green-500/10 to-transparent',
    borderColor: 'border-green-500/30',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
  },

  {
    degree: 'Happy Clients',
    institution: 'Long-term Partnerships',
    year: '40+',
    description:
      'Building long-term partnerships and driving real results. Our clients are our best advocates and return for repeat work.',
    icon: Users,
    gradient: 'from-[#beff01]/20 via-green-500/10 to-transparent',
    borderColor: 'border-[#beff01]/30',
    iconBg: 'bg-[#beff01]/10',
    iconColor: 'text-[#beff01]',
  },

  {
    degree: 'Client Satisfaction',
    institution: 'Excellence Standard',
    year: '98%',
    description:
      'Committed to excellence and exceeding expectations. We measure success by our clients\' results and satisfaction.',
    icon: Zap,
    gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
    borderColor: 'border-purple-500/30',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },

];

export default function Achievements() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#beff01]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#beff01] font-semibold tracking-wide">
            PROVEN RESULTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Our Achievements
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mt-6">
            We're proud of what we've accomplished. These numbers represent our
            commitment to excellence and the value we deliver daily.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
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
                  className={`absolute inset-0 bg-gradient-to-r ${achievement.gradient} rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100`}
                />

                {/* Card */}
                <div
                  className={`relative bg-zinc-900/50 backdrop-blur border ${achievement.borderColor} rounded-xl p-6 transition-all duration-300 group-hover:bg-zinc-900/80`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} rounded-xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative mb-6 inline-flex p-4 ${achievement.iconBg} rounded-lg`}
                  >
                    <Icon className={`w-8 h-8 ${achievement.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-lg font-bold text-white mb-1">
                    {achievement.degree}
                  </h3>
                  <p className="relative text-[#beff01] text-sm font-semibold mb-3">
                    {achievement.institution}
                  </p>
                  <p className="relative text-4xl font-bold text-white mb-3">
                    {achievement.year}
                  </p>
                  <p className="relative text-zinc-400 text-sm leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-1 h-8 bg-gradient-to-b from-[#beff01] to-transparent rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}