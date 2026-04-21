import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Transformation Services | AI, Web & Visual Solutions',
  description: 'BidayaLab offers AI automation, custom web development, and visual storytelling services for SMEs. Scale your business with our Marrakech-based digital agency.',
  keywords: [
    'AI automation agency Morocco',
    'web development agency Marrakech',
    'digital transformation services',
    'visual storytelling agency',
    'chatbot development for small business',
    'e-commerce development Morocco',
  ],
  openGraph: {
    title: 'Digital Transformation Services | BidayaLab',
    description: 'AI automation, custom web development, and visual storytelling for ambitious SMEs.',
    url: 'https://www.bidayalab.com/services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/services',
  },
};

const services = [
  {
    number: '01',
    title: 'AI Automation',
    tagline: 'Work smarter. Scale faster.',
    description:
      'We deploy intelligent AI systems that automate your repetitive workflows, capture and nurture leads around the clock, and integrate seamlessly with your existing CRM. From custom chatbots that handle customer queries instantly to email sequences that convert on autopilot — we engineer the AI backbone your business needs to compete.',
    capabilities: [
      'Custom AI Chatbots',
      'Workflow Automation',
      'Lead Generation & Nurturing',
      'Email Marketing Automation',
      'CRM Integration (HubSpot, Salesforce)',
      'Data Processing & Analytics',
    ],
    results: '40% average reduction in manual workload for our clients.',
    image: '/assets/images/services/ai-automation.webp',
    alt: 'AI automation workflow and chatbot integration for small business',
  },
  {
    number: '02',
    title: 'Web Development',
    tagline: 'Your digital storefront, engineered for growth.',
    description:
      'We build custom websites and web applications that don\'t just look stunning — they convert. Built on modern frameworks like Next.js and React, our platforms are fast, responsive, and SEO-optimized from day one. Whether you need a high-converting landing page, a full e-commerce store, or a complex SaaS dashboard, we deliver production-grade code that scales.',
    capabilities: [
      'Custom Website Design & Development',
      'E-commerce Platforms',
      'Progressive Web Apps (PWA)',
      'Landing Pages & Funnels',
      'CMS Integration',
      'API Development & Integration',
    ],
    results: '3x average improvement in page load speed and conversion rates.',
    image: '/assets/images/services/web-development.webp',
    alt: 'Custom web development and e-commerce solutions for SMEs',
  },
  {
    number: '03',
    title: 'Visual Storytelling',
    tagline: 'Your brand, brought to life.',
    description:
      'In a scroll-happy world, attention is currency. We produce premium video content, professional photography, and motion graphics that stop the scroll and tell your brand story in a way that resonates. From brand documentaries to product shoots and social media content packages — we craft visuals that elevate your market perception and drive engagement.',
    capabilities: [
      'Brand Films & Documentaries',
      'Product Photography',
      'Motion Graphics & Animation',
      'Social Media Content Packages',
      'Corporate Video Production',
      'Drone & Aerial Photography',
    ],
    results: '2.5x average increase in social media engagement for visual campaigns.',
    image: '/assets/images/services/visual-storytelling.webp',
    alt: 'Brand film and photography production for digital marketing',
  },
];

export default function ServicesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bidayalab.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.bidayalab.com/services' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="relative bg-[#050505] min-h-screen text-white selection:bg-[#beff01] selection:text-black font-louis">

        {/* Hero */}
        <section className="relative min-h-[60vh] flex flex-col justify-end pb-20 pt-40 px-4 md:px-12 border-b border-white/5">
          <div className="max-w-7xl w-full mx-auto">
            <span className="block text-xs uppercase tracking-[0.2em] text-[#beff01] font-bold mb-4">
              What We Do
            </span>
            <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-white mb-8">
              Digital Transformation<br />
              <span className="text-zinc-600">Services.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl border-l-2 border-[#beff01] pl-6">
              AI automation, custom web development, and visual storytelling — everything your SME needs to dominate the digital landscape. Based in Marrakech, serving clients globally.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-[1920px] mx-auto px-4 md:px-8 py-20">
          <div className="flex flex-col gap-24 md:gap-32">
            {services.map((service) => (
              <article key={service.number} id={`service-${service.number}`} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                {/* Image */}
                <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                  {/* Using img tag with controlled width instead of Next/Image fill to respect the 1200px cap */}
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={750}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  <span className="text-[#beff01] text-sm font-bold uppercase tracking-widest">[{service.number}]</span>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                    {service.title}
                  </h2>
                  <p className="text-xl text-zinc-300 font-light italic">{service.tagline}</p>
                  <p className="text-zinc-400 leading-relaxed">{service.description}</p>

                  {/* Capabilities */}
                  <div className="mt-4">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Capabilities</span>
                    <div className="flex flex-wrap gap-2">
                      {service.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="px-3 py-1.5 border border-zinc-700 text-white text-xs font-medium uppercase tracking-wide"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mt-4 p-6 border border-[#beff01]/20 bg-[#beff01]/5">
                    <p className="text-[#beff01] font-bold text-lg">{service.results}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 md:px-12 border-t border-white/5 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white">
              Ready to Transform<br />Your Business?
            </h2>
            <p className="text-zinc-400 text-lg mb-10">
              Book a free consultation and let&apos;s map out your digital transformation roadmap together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#beff01] text-black font-black uppercase tracking-wider text-lg hover:bg-white transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
