import { getMessages, markAsRead, deleteMessage } from "@/app/actions/messages";
import { Mail, Phone, Clock, CheckCircle, Trash2, MessageSquare, Eye, User, Calendar } from "lucide-react";
import Link from "next/link";

export default async function MessagesPage() {
    const messages = await getMessages();

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Messages</h1>
                <p className="text-sm md:text-base text-zinc-400">View and manage inquiries.</p>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {messages.map((msg: any) => (
                    <div key={msg._id} className={`bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden ${msg.status === 'new' ? 'ring-1 ring-[#beff01]/20' : ''}`}>
                        <div className="p-4 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.status === 'new' ? 'bg-[#beff01] text-black' : 'bg-white/5 text-zinc-400'}`}>
                                        <MessageSquare size={18} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className={`font-bold truncate ${msg.status === 'new' ? 'text-white' : 'text-zinc-300'}`}>{msg.name}</div>
                                        <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                            <Clock size={10} />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${msg.status === 'new' ? 'bg-[#beff01]/10 text-[#beff01] border-[#beff01]/20' :
                                    msg.status === 'read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                    }`}>
                                    {msg.status}
                                </span>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1.5 text-sm">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Mail size={12} className="flex-shrink-0" />
                                    <span className="truncate">{msg.email}</span>
                                </div>
                                {msg.phone && (
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <Phone size={12} className="flex-shrink-0" />
                                        <span className="truncate">{msg.phone}</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t border-white/5">
                                <Link href={`/dashboard/messages/${msg._id}`} className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-sm font-medium">
                                    <Eye size={16} />
                                    View
                                </Link>
                                {msg.status === 'new' && (
                                    <form action={async () => {
                                        "use server";
                                        await markAsRead(msg._id);
                                    }} className="flex-1">
                                        <button type="submit" className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#beff01]/10 hover:bg-[#beff01]/20 text-[#beff01] transition-colors text-sm font-medium">
                                            <CheckCircle size={16} />
                                            Mark Read
                                        </button>
                                    </form>
                                )}
                                <form action={async () => {
                                    "use server";
                                    await deleteMessage(msg._id);
                                }}>
                                    <button type="submit" className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className="p-12 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-2xl">
                        No messages found.
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Sender</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Contact Info</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Date</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {messages.map((msg: any) => (
                                <tr key={msg._id} className={`group hover:bg-white/5 transition-colors ${msg.status === 'new' ? 'bg-[#beff01]/5' : ''}`}>
                                    <td className="p-4 lg:p-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.status === 'new' ? 'bg-[#beff01] text-black' : 'bg-white/5 text-zinc-400'}`}>
                                                <MessageSquare size={18} />
                                            </div>
                                            <div>
                                                <div className={`font-bold ${msg.status === 'new' ? 'text-white' : 'text-zinc-300'}`}>{msg.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 lg:p-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm text-zinc-300 flex items-center gap-2">
                                                <Mail size={12} className="text-zinc-500" /> {msg.email}
                                            </div>
                                            {msg.phone && (
                                                <div className="text-xs text-zinc-500 flex items-center gap-2">
                                                    <Phone size={12} /> {msg.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 lg:p-6">
                                        <div className="text-sm text-zinc-400 flex items-center gap-2">
                                            <Clock size={14} />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4 lg:p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${msg.status === 'new' ? 'bg-[#beff01]/10 text-[#beff01] border-[#beff01]/20' :
                                            msg.status === 'read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                            }`}>
                                            {msg.status}
                                        </span>
                                    </td>
                                    <td className="p-4 lg:p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/dashboard/messages/${msg._id}`} className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="View Message">
                                                <Eye size={18} />
                                            </Link>
                                            {msg.status === 'new' && (
                                                <form action={async () => {
                                                    "use server";
                                                    await markAsRead(msg._id);
                                                }}>
                                                    <button type="submit" className="p-2 rounded-lg hover:bg-[#beff01]/10 text-zinc-400 hover:text-[#beff01] transition-colors" title="Mark as Read">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                </form>
                                            )}
                                            <form action={async () => {
                                                "use server";
                                                await deleteMessage(msg._id);
                                            }}>
                                                <button type="submit" className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {messages.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-zinc-500">
                                        No messages found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
