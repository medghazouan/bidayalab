import { getTestimonials, deleteTestimonial } from "@/app/actions/testimonials";
import { Plus, Trash2, Quote, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Testimonials</h1>
                    <p className="text-zinc-400">Manage client feedback.</p>
                </div>
                <Link href="/dashboard/testimonials/new" className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                    <Plus size={20} /> Add Testimonial
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t: any) => (
                    <div key={t._id} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 relative group">
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Link href={`/dashboard/testimonials/${t._id}`} className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                                <Pencil size={16} />
                            </Link>
                            <form action={async () => {
                                "use server";
                                await deleteTestimonial(t._id);
                            }}>
                                <button type="submit" className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </form>
                        </div>

                        <div className="mb-6 text-[#beff01]">
                            <Quote size={32} />
                        </div>

                        <p className="text-zinc-300 mb-6 leading-relaxed">"{t.content}"</p>

                        <div className="flex items-center gap-4">
                            <div>
                                <div className="font-bold text-white">{t.name}</div>
                                <div className="text-xs text-zinc-500">{t.position}</div>
                            </div>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && (
                    <div className="col-span-full p-12 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-3xl">
                        No testimonials found.
                    </div>
                )}
            </div>
        </div>
    );
}
