"use client";

import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/app/actions/settings";
import { changePassword, createAdmin } from "@/app/actions/admin";
import { Loader2, Save, Link as LinkIcon, Instagram, Linkedin, Shield, Users, Lock, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("general");
    const [loading, setLoading] = useState(true);

    // General Settings State
    const [settings, setSettings] = useState({
        linkedinUrl: "",
        instagramUrl: "",
        email: "",
        phone: "",
        whatsapp: ""
    });
    const [savingSettings, setSavingSettings] = useState(false);
    const [settingsMessage, setSettingsMessage] = useState("");

    // Password Change State
    const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");

    // Add Admin State
    const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", role: "editor" });
    const [creatingAdmin, setCreatingAdmin] = useState(false);
    const [adminMessage, setAdminMessage] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getSettings();
            if (data) {
                setSettings({
                    linkedinUrl: data.linkedinUrl || "",
                    instagramUrl: data.instagramUrl || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    whatsapp: data.whatsapp || ""
                });
            }
            setLoading(false);
        };
        fetchSettings();
    }, []);

    const handleSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSettings(true);
        setSettingsMessage("");

        const result = await updateSettings(settings);

        if (result.success) {
            setSettingsMessage("Settings updated successfully!");
        } else {
            setSettingsMessage("Failed to update settings.");
        }
        setSavingSettings(false);
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            setPasswordMessage("New passwords do not match.");
            return;
        }

        setChangingPassword(true);
        setPasswordMessage("");

        const result = await changePassword(passwordData.current, passwordData.new);

        if (result.success) {
            setPasswordMessage("Password changed successfully!");
            setPasswordData({ current: "", new: "", confirm: "" });
        } else {
            setPasswordMessage(result.error || "Failed to change password.");
        }
        setChangingPassword(false);
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreatingAdmin(true);
        setAdminMessage("");

        const result = await createAdmin(newAdmin);

        if (result.success) {
            setAdminMessage("New admin created successfully!");
            setNewAdmin({ name: "", email: "", password: "", role: "editor" });
        } else {
            setAdminMessage(result.error || "Failed to create admin.");
        }
        setCreatingAdmin(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-[#beff01]" />
            </div>
        );
    }

    const tabs = [
        { id: "general", label: "General", icon: LinkIcon },
        { id: "security", label: "Security", icon: Shield },
        { id: "team", label: "Team", icon: Users },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Settings</h1>
                <p className="text-zinc-400">Manage your website configuration and team.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/5 pb-1 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                            ? "bg-[#beff01] text-black"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* General Settings */}
            {activeTab === "general" && (
                <form onSubmit={handleSettingsSubmit} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <LinkIcon size={20} className="text-[#beff01]" /> Social Media Links
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider flex items-center gap-2">
                                <Linkedin size={14} /> LinkedIn URL
                            </label>
                            <input
                                type="url"
                                value={settings.linkedinUrl}
                                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider flex items-center gap-2">
                                <Instagram size={14} /> Instagram URL
                            </label>
                            <input
                                type="url"
                                value={settings.instagramUrl}
                                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                placeholder="https://instagram.com/..."
                            />
                        </div>

                        <div className="h-px bg-white/5 my-6" /> {/* Divider */}
                        <h3 className="text-md font-bold text-white mb-4">Contact Information</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Public Email</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                placeholder="contact@bidayalab.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Phone Number</label>
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">WhatsApp Number</label>
                                <input
                                    type="text"
                                    value={settings.whatsapp}
                                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    {settingsMessage && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${settingsMessage.includes("success") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                            {settingsMessage}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={savingSettings}
                            className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {savingSettings ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
                <form onSubmit={handlePasswordSubmit} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Lock size={20} className="text-[#beff01]" /> Change Password
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.current}
                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                placeholder="Enter current password"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    required
                                    minLength={6}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                    required
                                    minLength={6}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>
                    </div>

                    {passwordMessage && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${passwordMessage.includes("success") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                            {passwordMessage}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {changingPassword ? <Loader2 size={20} className="animate-spin" /> : <><Save size={20} /> Update Password</>}
                        </button>
                    </div>
                </form>
            )}

            {/* Team Settings */}
            {activeTab === "team" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {(session?.user as any)?.role === "admin" ? (
                        <form onSubmit={handleCreateAdmin} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <UserPlus size={20} className="text-[#beff01]" /> Add New Admin
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={newAdmin.name}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={newAdmin.email}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Password</label>
                                        <input
                                            type="password"
                                            value={newAdmin.password}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                            required
                                            minLength={6}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors"
                                            placeholder="Initial password"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Role</label>
                                        <select
                                            value={newAdmin.role}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#beff01] focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="admin">Admin (Full Access)</option>
                                            <option value="editor">Editor (Limited Access)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {adminMessage && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${adminMessage.includes("success") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                    {adminMessage}
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={creatingAdmin}
                                    className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {creatingAdmin ? <Loader2 size={20} className="animate-spin" /> : <><UserPlus size={20} /> Create User</>}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-12 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                                <Lock className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Access Restricted</h3>
                            <p className="text-zinc-400 max-w-md mx-auto">
                                Only administrators with full access privileges can add new team members. Please contact your system administrator.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
