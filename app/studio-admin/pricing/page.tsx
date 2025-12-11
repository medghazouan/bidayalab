import { getPricingPlans, deletePricingPlan } from "@/app/actions/pricing";
import { Plus, Trash2, Check, Pencil } from "lucide-react";
import Link from "next/link";
import { IPricingPlan } from "@/models/PricingPlan";

export default async function PricingPage() {
    const plans = await getPricingPlans();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Pricing Plans</h1>
                    <p className="text-zinc-400">Manage service packages.</p>
                </div>
                <Link href="/dashboard/pricing/new" className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                    <Plus size={20} /> Add New Plan
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan: IPricingPlan) => (
                    <div key={String(plan._id)} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 relative group hover:border-[#beff01]/30 transition-colors">
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Link href={`/dashboard/pricing/${plan._id}`} className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                                <Pencil size={16} />
                            </Link>
                            <form action={async () => {
                                "use server";
                                await deletePricingPlan(String(plan._id));
                            }}>
                                <button type="submit" className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </form>
                        </div>

                        <div className="mb-2 text-sm font-bold text-[#beff01] uppercase tracking-wider">{plan.name}</div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black text-white">{plan.price} <span className="text-lg font-bold text-[#beff01]">{plan.currency}</span></span>
                            <span className="text-zinc-500">/{plan.period || 'project'}</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <Check size={16} className="text-[#beff01] mt-0.5 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {plans.length === 0 && (
                    <div className="col-span-full p-12 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-3xl">
                        No pricing plans found.
                    </div>
                )}
            </div>
        </div>
    );
}
