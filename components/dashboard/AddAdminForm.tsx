"use client";

import { useState } from "react";
import { createAdmin } from "@/app/actions/admin";
import { UserPlus, Loader2, Save } from "lucide-react";

export default function AddAdminForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            await createAdmin(formData);
            setSuccess(true);
            // Reset form
            const form = document.getElementById("add-admin-form") as HTMLFormElement;
            form?.reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create admin");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserPlus size={20} className="text-[#beff01]" /> Add New Admin
            </h2>

            <form id="add-admin-form" action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Full Name</label>
                        <input name="name" required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Email Address</label>
                        <input name="email" type="email" required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Password</label>
                        <input name="password" type="password" required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Role</label>
                        <select name="role" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors">
                            <option value="admin">Admin (Full Access)</option>
                            <option value="editor">Editor (Limited Access)</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium">
                        Admin created successfully!
                    </div>
                )}

                <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Create Admin</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
