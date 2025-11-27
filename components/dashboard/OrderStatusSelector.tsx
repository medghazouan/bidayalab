"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/actions/orders";
import { CheckCircle, Clock, XCircle, ChevronDown, Loader2 } from "lucide-react";

interface OrderStatusSelectorProps {
    orderId: string;
    currentStatus: string;
}

export default function OrderStatusSelector({ orderId, currentStatus }: OrderStatusSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = async (newStatus: string) => {
        setLoading(true);
        setIsOpen(false);
        try {
            await updateOrderStatus(orderId, newStatus);
            setStatus(newStatus);
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'completed': return 'bg-[#beff01] text-black hover:bg-[#a8e600]';
            case 'confirmed': return 'bg-blue-500 text-white hover:bg-blue-600';
            case 'cancelled': return 'bg-red-500 text-white hover:bg-red-600';
            default: return 'bg-yellow-500 text-black hover:bg-yellow-400';
        }
    };

    const getStatusIcon = (s: string) => {
        switch (s) {
            case 'completed': return <CheckCircle size={18} />;
            case 'confirmed': return <CheckCircle size={18} />;
            case 'cancelled': return <XCircle size={18} />;
            default: return <Clock size={18} />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${getStatusColor(status)} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? <Loader2 size={18} className="animate-spin" /> : getStatusIcon(status)}
                <span className="capitalize">{status}</span>
                <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    {['pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
                        <button
                            key={s}
                            onClick={() => handleStatusChange(s)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 ${status === s ? 'text-[#beff01]' : 'text-zinc-400'}`}
                        >
                            {getStatusIcon(s)}
                            <span className="capitalize">{s}</span>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}
