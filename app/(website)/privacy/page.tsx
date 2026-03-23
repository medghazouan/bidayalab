export const metadata = {
  title: 'Privacy Policy | BidayaLab',
  description: 'Privacy Policy for BidayaLab, a digital transformation agency in Marrakech.',
};

export default function PrivacyPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen text-white pt-32 md:pt-48 pb-20 px-4 md:px-8 selection:bg-[#beff01] selection:text-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Title and Sticky Index */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <span className="block text-[#beff01] font-louis uppercase tracking-[0.2em] text-sm mb-4">
                Legal Information
              </span>
              <h1 className="text-5xl md:text-7xl font-black font-louis uppercase tracking-tighter leading-[0.9]">
                Privacy<br/><span className="text-zinc-600">Policy</span>
              </h1>
              <p className="mt-6 text-zinc-400 font-louis text-lg border-l-2 border-[#beff01]/30 pl-4">
                Last Updated: March 2026
              </p>
            </div>

            <div className="hidden lg:block sticky top-32 p-8 border border-white/5 bg-white/[0.02] mt-12">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-600 font-louis font-bold block mb-6">Contents</span>
              <ul className="space-y-4 font-louis text-sm text-zinc-400">
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">01</span> Information We Collect</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">02</span> How We Use Data</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">03</span> Data Security</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">04</span> Third-Party Links</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">05</span> Contact Us</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none font-louis">
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-16 font-light">
                BidayaLab (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website (www.bidayalab.com) or use our digital transformation services.
              </p>

              <div className="space-y-20">
                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">01</span> Information We Collect
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    We may collect personal information such as your name, email address, phone number, and company details when you voluntarily submit inquiries through our contact forms, subscribe to our newsletter, or engage our services.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">02</span> How We Use Your Information
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg mb-8">We use the collected information for the following purposes:</p>
                  <ul className="grid md:grid-cols-2 gap-4">
                    <li className="p-6 border border-white/5 bg-white/[0.02] text-zinc-300 hover:border-[#beff01]/30 transition-colors">Provide, operate, and maintain services</li>
                    <li className="p-6 border border-white/5 bg-white/[0.02] text-zinc-300 hover:border-[#beff01]/30 transition-colors">Respond to inquiries & support</li>
                    <li className="p-6 border border-white/5 bg-white/[0.02] text-zinc-300 hover:border-[#beff01]/30 transition-colors">Send project updates & marketing</li>
                    <li className="p-6 border border-white/5 bg-white/[0.02] text-zinc-300 hover:border-[#beff01]/30 transition-colors">Improve user experience & analytics</li>
                  </ul>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">03</span> Data Security
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of data transmission over the Internet or electronic storage is 100% secure.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">04</span> Third-Party Links
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    Our website may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">05</span> Contact Us
                  </h2>
                  <div className="p-8 md:p-12 border border-white/10 bg-[#beff01]/5 relative overflow-hidden group-hover:border-[#beff01]/30 transition-colors duration-500">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#beff01]/10 rounded-full blur-3xl" />
                    <p className="text-zinc-300 mb-6 text-lg relative z-10">
                      If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:
                    </p>
                    <a href="mailto:support@bidayalab.com" className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-[#beff01] hover:text-white transition-colors relative z-10">
                      support@bidayalab.com
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
