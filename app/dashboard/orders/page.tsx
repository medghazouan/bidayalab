import { getOrders, updateOrderStatus } from "@/app/actions/orders";
import { ShoppingBag, Clock, CheckCircle, XCircle, Eye, Calendar, DollarSign, User, Mail } from "lucide-react";
import Link from "next/link";

export default async function OrdersPage() {
    const orders = await getOrders();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-[#beff01]/10 text-[#beff01] border-[#beff01]/20';
            case 'confirmed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Orders</h1>
                <p className="text-sm md:text-base text-zinc-400">Track and manage your service orders.</p>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {orders.map((order: any) => (
                    <div key={order._id} className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-4 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 flex-shrink-0">
                                        <ShoppingBag size={18} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-mono text-sm text-[#beff01] truncate">#{order.orderNumber || order._id.toString().slice(-6)}</div>
                                        <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                            <Calendar size={10} />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Client Info */}
                            <div className="flex items-start gap-2 text-sm">
                                <User size={14} className="text-zinc-500 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-white truncate">{order.name}</div>
                                    <div className="text-xs text-zinc-500 truncate">{order.email}</div>
                                </div>
                            </div>

                            {/* Plan & Price */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <div className="min-w-0 flex-1">
                                    <div className="text-xs text-zinc-500">Plan</div>
                                    <div className="text-sm text-zinc-300 font-medium truncate">{order.plan}</div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-xs text-zinc-500">Price</div>
                                    <div className="text-sm font-bold text-white flex items-center gap-1 justify-end">
                                        <DollarSign size={12} className="text-[#beff01]" />
                                        {order.price} {order.currency}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-3 border-t border-white/5">
                                <Link href={`/dashboard/orders/${order._id}`} className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-sm font-medium">
                                    <Eye size={16} />
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <div className="p-12 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-2xl">
                        No orders found.
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Order Details</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Client</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Plan & Price</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 lg:p-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order: any) => (
                                <tr key={order._id} className="group hover:bg-white/5 transition-colors">
                                    <td className="p-4 lg:p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors flex-shrink-0">
                                                <ShoppingBag size={18} />
                                            </div>
                                            <div>
                                                <div className="font-mono text-sm text-[#beff01]">#{order.orderNumber || order._id.toString().slice(-6)}</div>
                                                <div className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                                                    <Calendar size={12} />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 lg:p-6">
                                        <div className="font-bold text-white">{order.name}</div>
                                        <div className="text-xs text-zinc-500">{order.email}</div>
                                    </td>
                                    <td className="p-4 lg:p-6">
                                        <div className="text-sm text-zinc-300 font-medium">{order.plan}</div>
                                        <div className="text-xs font-bold text-white mt-1 flex items-center gap-1">
                                            <DollarSign size={12} className="text-[#beff01]" />
                                            {order.price} {order.currency}
                                        </div>
                                    </td>
                                    <td className="p-4 lg:p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 lg:p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/dashboard/orders/${order._id}`} className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="View Details">
                                                <Eye size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-zinc-500">
                                        No orders found.
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
