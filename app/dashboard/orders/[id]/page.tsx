import { getOrder } from "@/app/actions/orders";
import OrderStatusSelector from "@/components/dashboard/OrderStatusSelector";
import { ArrowLeft, Calendar, Mail, Phone, User, ShoppingBag, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const order = await getOrder(params.id);

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/orders" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl md:text-3xl font-black text-white">Order #{order.orderNumber || order._id.toString().slice(-6)}</h1>
                        </div>
                        <p className="text-zinc-400 flex items-center gap-2 text-sm">
                            <Calendar size={14} />
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <OrderStatusSelector orderId={order._id} currentStatus={order.status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Plan Details */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <ShoppingBag size={20} className="text-[#beff01]" /> Order Summary
                        </h2>
                        <div className="bg-black/50 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold text-white mb-1">{order.plan}</div>
                                <div className="text-sm text-zinc-500 font-mono">ID: {order.planId}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-[#beff01]">${order.price}</div>
                                <div className="text-xs text-zinc-500 uppercase font-bold">{order.currency}</div>
                            </div>
                        </div>
                    </div>

                    {/* Client Message */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <AlertCircle size={20} className="text-[#beff01]" /> Client Requirements
                        </h2>
                        <div className="bg-black/50 rounded-2xl p-6 border border-white/5 min-h-[150px]">
                            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {order.message || "No additional requirements provided."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Client Info */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <User size={20} className="text-[#beff01]" /> Client Details
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Name</label>
                                <div className="text-white font-medium flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-400">
                                        <User size={14} />
                                    </div>
                                    {order.name}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Email</label>
                                <a href={`mailto:${order.email}`} className="text-[#beff01] hover:underline font-medium flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-400">
                                        <Mail size={14} />
                                    </div>
                                    {order.email}
                                </a>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Phone</label>
                                <a href={`tel:${order.phone}`} className="text-white hover:text-[#beff01] transition-colors font-medium flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-400">
                                        <Phone size={14} />
                                    </div>
                                    {order.phone}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Timeline (Mock) */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Clock size={20} className="text-[#beff01]" /> Timeline
                        </h2>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10" />

                            <div className="relative flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#beff01] border-4 border-black z-10 flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-bold text-white">Order Placed</div>
                                    <div className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleString()}</div>
                                </div>
                            </div>

                            {order.status !== 'pending' && (
                                <div className="relative flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-black z-10 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm font-bold text-white">Order Confirmed</div>
                                        <div className="text-xs text-zinc-500">Processing started</div>
                                    </div>
                                </div>
                            )}

                            {order.status === 'completed' && (
                                <div className="relative flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#beff01] border-4 border-black z-10 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm font-bold text-white">Order Completed</div>
                                        <div className="text-xs text-zinc-500">Service delivered</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
