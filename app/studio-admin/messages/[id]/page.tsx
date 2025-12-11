import { getMessage, markAsRead, deleteMessage } from "@/app/actions/messages";
import { ArrowLeft, Calendar, Mail, Phone, User, MessageSquare, CheckCircle, Trash2, Clock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MessageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const msg = await getMessage(id);

    if (!msg) {
        redirect("/dashboard/messages");
    }

    return (
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto pb-12 md:pb-20 px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3 md:gap-4">
                    <Link href="/dashboard/messages" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors mt-0.5 md:mt-0 flex-shrink-0">
                        <ArrowLeft size={18} className="md:w-5 md:h-5" />
                    </Link>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                            <h1 className="text-xl md:text-3xl font-black text-white">Message Details</h1>
                            <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${msg.status === 'new' ? 'bg-[#beff01]/10 text-[#beff01] border-[#beff01]/20' :
                                msg.status === 'read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                }`}>
                                {msg.status}
                            </span>
                        </div>
                        <p className="text-xs md:text-sm text-zinc-400 flex items-center gap-2 flex-wrap">
                            <Calendar size={12} className="md:w-3.5 md:h-3.5 flex-shrink-0" />
                            <span className="truncate">Received on {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    {msg.status === 'new' && (
                        <form action={async () => {
                            "use server";
                            await markAsRead(msg._id);
                        }} className="flex-1 md:flex-initial">
                            <button className="w-full md:w-auto bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                                <CheckCircle size={18} className="md:w-5 md:h-5" />
                                <span className="hidden sm:inline">Mark as Read</span>
                                <span className="sm:hidden">Mark Read</span>
                            </button>
                        </form>
                    )}

                    <form action={async () => {
                        "use server";
                        await deleteMessage(msg._id);
                        redirect("/dashboard/messages");
                    }}>
                        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-xl transition-colors flex items-center gap-2 border border-red-500/20 text-sm md:text-base">
                            <Trash2 size={18} className="md:w-5 md:h-5" />
                            <span className="hidden sm:inline">Delete</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Sender Info */}
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 h-fit">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                        <User size={18} className="md:w-5 md:h-5 text-[#beff01]" /> Sender Details
                    </h2>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Name</label>
                            <div className="text-sm md:text-base text-white font-medium flex items-center gap-2 md:gap-3">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 flex-shrink-0">
                                    <User size={12} className="md:w-3.5 md:h-3.5" />
                                </div>
                                <span className="truncate">{msg.name}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Email</label>
                            <a href={`mailto:${msg.email}`} className="text-sm md:text-base text-[#beff01] hover:underline font-medium flex items-center gap-2 md:gap-3 min-w-0">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 flex-shrink-0">
                                    <Mail size={12} className="md:w-3.5 md:h-3.5" />
                                </div>
                                <span className="truncate">{msg.email}</span>
                            </a>
                        </div>
                        {msg.phone && (
                            <div>
                                <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Phone</label>
                                <a href={`tel:${msg.phone}`} className="text-sm md:text-base text-white hover:text-[#beff01] transition-colors font-medium flex items-center gap-2 md:gap-3">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 flex-shrink-0">
                                        <Phone size={12} className="md:w-3.5 md:h-3.5" />
                                    </div>
                                    <span className="truncate">{msg.phone}</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Content */}
                <div className="md:col-span-2 bg-zinc-900/30 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                        <MessageSquare size={18} className="md:w-5 md:h-5 text-[#beff01]" /> Message Content
                    </h2>
                    <div className="bg-black/50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/5 min-h-[200px] md:min-h-[300px]">
                        <p className="text-sm md:text-lg text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
                            {msg.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
