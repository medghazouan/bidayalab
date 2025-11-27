import { getProjects } from "@/app/actions/projects";
import { getMessages } from "@/app/actions/messages";
import { getOrders } from "@/app/actions/orders";
import { LayoutDashboard, FolderKanban, MessageSquare, TrendingUp, ShoppingBag, ArrowUpRight, Clock, CheckCircle2, AlertCircle, Sparkles, Activity, Package } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const [projects, messages, orders] = await Promise.all([
        getProjects(),
        getMessages(),
        getOrders()
    ]);

    // Calculate Stats
    const totalProjects = projects.length;
    const totalMessages = messages.length;
    const unreadMessages = messages.filter((m: any) => m.status === 'new').length;
    const totalOrders = orders.length;
    const activeOrders = orders.filter((o: any) => o.status === 'pending' || o.status === 'confirmed').length;
    const completedOrders = orders.filter((o: any) => o.status === 'completed').length;
    const totalRevenue = orders.reduce((acc: number, order: any) => {
        const price = parseFloat(order.price) || 0;
        return acc + price;
    }, 0);

    // Projects by Category
    const categoryColors: any = {
        'creative-studio': { bg: 'bg-pink-500', text: 'text-pink-400', glow: 'from-pink-500/20' },
        'digital-development': { bg: 'bg-blue-500', text: 'text-blue-400', glow: 'from-blue-500/20' },
        'ai-automation': { bg: 'bg-purple-500', text: 'text-purple-400', glow: 'from-purple-500/20' },
        'digital-marketing': { bg: 'bg-green-500', text: 'text-green-400', glow: 'from-green-500/20' },
        'visual-storytelling': { bg: 'bg-orange-500', text: 'text-orange-400', glow: 'from-orange-500/20' }
    };

    const categories = projects.reduce((acc: any, project: any) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
    }, {});

    // Recent Activity (Combine Orders and Messages) - Fixed data fields
    const recentActivity = [
        ...orders.map((o: any) => ({
            _id: o._id,
            type: 'order',
            title: `New Order: ${o.plan || 'Service'}`,
            subtitle: `${o.name} • $${o.price} ${o.currency}`,
            status: o.status,
            date: new Date(o.createdAt),
            createdAt: o.createdAt
        })),
        ...messages.map((m: any) => ({
            _id: m._id,
            type: 'message',
            title: `Message from ${m.name}`,
            subtitle: m.email,
            status: m.status,
            date: new Date(m.createdAt),
            createdAt: m.createdAt
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);

    return (
        <div className="space-y-6 md:space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#beff01]/20 to-[#beff01]/5 flex items-center justify-center">
                            <LayoutDashboard size={24} className="md:w-7 md:h-7 text-[#beff01]" />
                        </div>
                        Dashboard Overview
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400">Welcome back to your command center.</p>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 bg-zinc-900/50 px-3 md:px-4 py-2 rounded-full border border-white/5">
                    <Clock size={14} />
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Total Revenue */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-[#beff01]/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#beff01]/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-[#beff01]/10"></div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#beff01]/10 flex items-center justify-center text-[#beff01]">
                            <TrendingUp size={20} className="md:w-6 md:h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-[#beff01] bg-[#beff01]/10 px-2 py-1 rounded-full">
                            +12% <ArrowUpRight size={10} className="md:w-3 md:h-3" />
                        </span>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">${totalRevenue.toLocaleString()}</div>
                        <div className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Revenue</div>
                    </div>
                </div>

                {/* Active Orders */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/10"></div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <ShoppingBag size={20} className="md:w-6 md:h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                            {activeOrders} Active
                        </span>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">{totalOrders}</div>
                        <div className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Orders</div>
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/10"></div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <FolderKanban size={20} className="md:w-6 md:h-6" />
                        </div>
                        <Link href="/dashboard/projects/new" className="text-[10px] md:text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                            + New
                        </Link>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">{totalProjects}</div>
                        <div className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Projects</div>
                    </div>
                </div>

                {/* Messages */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-500/10"></div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                            <MessageSquare size={20} className="md:w-6 md:h-6" />
                        </div>
                        {unreadMessages > 0 && (
                            <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">
                                {unreadMessages} New
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-1">{totalMessages}</div>
                        <div className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">Messages</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Recent Activity Feed - Modernized */}
                <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-zinc-900/50 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#beff01]/5 rounded-full blur-3xl"></div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#beff01]/20 to-[#beff01]/5 flex items-center justify-center">
                                    <Activity size={18} className="md:w-5 md:h-5 text-[#beff01]" />
                                </div>
                                Recent Activity
                            </h2>
                            <span className="text-xs text-zinc-500 font-medium">Last 6 items</span>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            {recentActivity.map((item: any) => (
                                <div key={item._id} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                                    <div className="relative flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-all hover:bg-black/60">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'order'
                                            ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400'
                                            : 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-orange-400'
                                            }`}>
                                            {item.type === 'order' ? <ShoppingBag size={18} className="md:w-5 md:h-5" /> : <MessageSquare size={18} className="md:w-5 md:h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${item.type === 'order'
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                    : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                                <span className="text-[10px] md:text-xs text-zinc-500">
                                                    {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="text-sm md:text-base text-white font-bold truncate mb-0.5">
                                                {item.title}
                                            </div>
                                            <div className="text-xs md:text-sm text-zinc-400 truncate">
                                                {item.subtitle}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            {item.type === 'order' && item.status && (
                                                <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md whitespace-nowrap ${item.status === 'completed' ? 'text-green-400 bg-green-500/10 border border-green-500/20' :
                                                    item.status === 'confirmed' ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' :
                                                        item.status === 'pending' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' :
                                                            'text-zinc-400 bg-zinc-500/10 border border-zinc-500/20'
                                                    }`}>
                                                    {item.status}
                                                </div>
                                            )}
                                            {item.type === 'message' && item.status === 'new' && (
                                                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-orange-400 animate-pulse"></div>
                                            )}
                                            <Link
                                                href={item.type === 'order' ? `/dashboard/orders/${item._id}` : `/dashboard/messages/${item._id}`}
                                                className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-zinc-500 hover:text-[#beff01] transition-colors"
                                            >
                                                View <ArrowUpRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {recentActivity.length === 0 && (
                                <div className="text-center py-12 md:py-16">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-600">
                                        <Activity size={28} className="md:w-8 md:h-8" />
                                    </div>
                                    <p className="text-sm md:text-base text-zinc-500 font-medium">No recent activity found.</p>
                                    <p className="text-xs md:text-sm text-zinc-600 mt-1">Orders and messages will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Projects Distribution - Modernized */}
                <div className="bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-zinc-900/50 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm flex flex-col relative overflow-hidden">
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                    <div className="relative flex-1">
                        <div className="flex items-center gap-2 mb-6 md:mb-8">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                                <Package size={18} className="md:w-5 md:h-5 text-purple-400" />
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                                Project Categories
                            </h2>
                        </div>
                        <div className="flex-1 space-y-5 md:space-y-6">
                            {Object.entries(categories).map(([category, count]: [string, any]) => {
                                const colors = categoryColors[category] || { bg: 'bg-zinc-500', text: 'text-zinc-400', glow: 'from-zinc-500/20' };
                                const percentage = (count / totalProjects) * 100;

                                return (
                                    <div key={category} className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs md:text-sm font-bold text-zinc-300 capitalize group-hover:text-white transition-colors flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${colors.bg}`}></div>
                                                {category.replace(/-/g, ' ')}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs md:text-sm text-zinc-500">{percentage.toFixed(0)}%</span>
                                                <span className={`text-sm md:text-base font-black ${colors.text}`}>{count}</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                                            <div
                                                className={`h-full bg-gradient-to-r ${colors.glow} to-transparent rounded-full transition-all duration-1000 ease-out relative`}
                                                style={{ width: `${percentage}%` }}
                                            >
                                                <div className={`absolute inset-0 ${colors.bg} opacity-60`}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {Object.keys(categories).length === 0 && (
                                <div className="text-center py-12 md:py-16">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-600">
                                        <FolderKanban size={28} className="md:w-8 md:h-8" />
                                    </div>
                                    <p className="text-sm md:text-base text-zinc-500 font-medium">No projects yet.</p>
                                    <Link href="/dashboard/projects/new" className="text-xs md:text-sm text-[#beff01] hover:underline mt-2 inline-block">
                                        Create your first project
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
                            <div className="flex items-center justify-between text-sm mb-4">
                                <span className="text-zinc-500 font-medium">Total Projects</span>
                                <span className="text-white font-black text-lg">{totalProjects}</span>
                            </div>
                            <Link
                                href="/dashboard/projects"
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 text-white py-2.5 md:py-3 rounded-xl font-bold transition-all text-sm border border-white/5 hover:border-white/10"
                            >
                                Manage Projects <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
