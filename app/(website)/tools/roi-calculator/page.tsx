import { Metadata } from 'next';
// import AiRoiCalculator from '@/components/tools/AiRoiCalculator'; // Temporarily commented out due to missing module
import { Calculator } from 'lucide-react';

export const metadata: Metadata = {
    title: 'AI ROI Calculator | Estimate Your Automation Savings',
    description: 'Calculate how much money and time your business can save by implementing AI automation. Free interactive tool for enterprise ROI estimation.',
    keywords: ['AI ROI Calculator', 'Automation Savings Estimator', 'Enterprise AI Cost Savings', 'Business Automation Tool'],
    openGraph: {
        title: 'AI ROI Calculator | Estimate Your Automation Savings',
        description: 'Stop paying for repetitive work. Calculate your potential savings with our AI ROI tool.',
        url: 'https://bidayalab.com/tools/roi-calculator',
        type: 'website',
    },
};

export default function RoiCalculatorPage() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden pt-32 pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#beff01]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Helper Header */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm mb-4">
                        <Calculator className="w-4 h-4 text-[#beff01]" />
                        <span className="text-zinc-400 text-sm font-medium">Free Automation Tool</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                        Calculate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#beff01] to-[#d4ff4d]">AI Potential</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-zinc-400 font-light leading-relaxed">
                        See exactly how much revenue you're losing to manual, repetitive tasks.
                        Input your team's metrics below to generate a conservative ROI estimate.
                    </p>
                </div>

                {/* The Calculator */}
                {/* <AiRoiCalculator /> */}
                <div className="p-8 border border-white/10 rounded-2xl text-center text-zinc-500">
                    Calculator temporarily unavailable.
                </div>

                {/* SEO Content / Footer Text */}
                <div className="mt-24 max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-2xl font-bold text-white">Why calculate AI ROI?</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-[#beff01] font-bold mb-2">Operational Leaks</h3>
                            <p className="text-zinc-400 text-sm">Most businesses don't realize that "5 hours a week" multiplied by 10 employees adds up to $100k+ in wasted salary annually.</p>
                        </div>
                        <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-[#beff01] font-bold mb-2">Opportunity Cost</h3>
                            <p className="text-zinc-400 text-sm">Every hour your team spends copying data is an hour they AREN'T spending on strategy, sales, or innovation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
