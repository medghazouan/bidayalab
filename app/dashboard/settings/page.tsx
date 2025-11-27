import { auth } from "@/auth";
import { User, Lock, Save } from "lucide-react";
import AddAdminForm from "@/components/dashboard/AddAdminForm";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
                <p className="text-zinc-400">Manage your account preferences.</p>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="flex items-center gap-4 pb-8 border-b border-white/5">
                    <div className="w-20 h-20 rounded-full bg-[#beff01]/10 border border-[#beff01]/20 flex items-center justify-center text-[#beff01]">
                        <User size={40} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{session?.user?.name || "Admin"}</h2>
                        <p className="text-zinc-500">{session?.user?.email}</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Full Name</label>
                            <input type="text" defaultValue={session?.user?.name || ""} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Email Address</label>
                            <input type="email" defaultValue={session?.user?.email || ""} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Lock size={20} className="text-[#beff01]" /> Change Password
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">New Password</label>
                                <input type="password" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Confirm Password</label>
                                <input type="password" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button type="submit" className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                            <Save size={20} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Add New Admin Section */}
            <AddAdminForm />
        </div>
    );
}
