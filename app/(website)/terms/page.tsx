export const metadata = {
  title: 'Terms of Service | BidayaLab',
  description: 'Terms of Service for BidayaLab, a digital transformation agency in Marrakech.',
};

export default function TermsPage() {
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
                Terms of<br/><span className="text-zinc-600">Service</span>
              </h1>
              <p className="mt-6 text-zinc-400 font-louis text-lg border-l-2 border-[#beff01]/30 pl-4">
                Last Updated: March 2026
              </p>
            </div>

            <div className="hidden lg:block sticky top-32 p-8 border border-white/5 bg-white/[0.02] mt-12">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-600 font-louis font-bold block mb-6">Contents</span>
              <ul className="space-y-4 font-louis text-sm text-zinc-400">
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">01</span> Our Services</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">02</span> Intellectual Property</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">03</span> User Responsibilities</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">04</span> Limitation of Liability</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">05</span> Governing Law</li>
                <li className="hover:text-[#beff01] transition-colors cursor-pointer flex items-center gap-3"><span className="text-[#beff01]/50 text-[10px]">06</span> Contact Information</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none font-louis">
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-16 font-light">
                Welcome to BidayaLab. By accessing our website (www.bidayalab.com) or utilizing our digital transformation services, you agree to be bound by the following Terms of Service. If you do not agree with any part of these terms, please do not use our services.
              </p>

              <div className="space-y-20">
                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">01</span> Our Services
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    BidayaLab operates as a digital transformation agency providing custom web development, AI automation, and visual storytelling services. The specific scope, deliverables, timelines, and costs for any tailored project will be systematically outlined in a separate, mutually agreed-upon Statement of Work (SOW) or contract.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">02</span> Intellectual Property
                  </h2>
                  <div className="p-6 border border-white/5 bg-white/[0.02] text-zinc-300">
                    <p className="leading-relaxed text-lg">
                      All content, graphics, designs, codebase, and materials published on this website are the intellectual property of BidayaLab or our respective licensors. You may not reproduce, distribute, modify, or create derivative works of any material from our site without our express prior written consent.
                    </p>
                  </div>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">03</span> User Responsibilities
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    When interacting with our website or services, you agree not to engage in any unauthorized, illegal, or malicious activities that may disrupt the functionality of our infrastructure or compromise the security of other users.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">04</span> Limitation of Liability
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    To the fullest extent permitted by applicable law, BidayaLab shall not be held liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services. Our maximum aggregate liability shall not exceed the total amount paid by you to us for the specific services giving rise to the claim.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">05</span> Governing Law
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    These Terms of Service shall be governed by and construed in accordance with the laws of the Kingdom of Morocco. Any legal disputes or claims arising out of these terms shall be subject to the exclusive jurisdiction of the courts located in Marrakech, Morocco.
                  </p>
                </section>

                <section className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#beff01]/50 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-4">
                    <span className="text-sm font-black text-[#beff01] bg-[#beff01]/10 px-2 py-1">06</span> Contact Information
                  </h2>
                  <div className="p-8 md:p-12 border border-white/10 bg-[#beff01]/5 relative overflow-hidden group-hover:border-[#beff01]/30 transition-colors duration-500">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#beff01]/10 rounded-full blur-3xl" />
                    <p className="text-zinc-300 mb-6 text-lg relative z-10">
                      If you have inquiries regarding these terms, you may reach out to our team at:
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
