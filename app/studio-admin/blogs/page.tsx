import { getBlogs, deleteBlog } from "@/app/actions/blogs";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, FileText, Calendar, User } from "lucide-react";
import Image from "next/image";

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Blogs</h1>
                    <p className="text-zinc-400">Manage your blog posts.</p>
                </div>
                <Link href="/dashboard/blogs/new" className="bg-[#beff01] hover:bg-[#a8e600] text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                    <Plus size={20} /> Add New Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog: any) => (
                    <div key={blog._id} className="group bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-[#beff01]/30 transition-all duration-300 flex flex-col">
                        {/* Image Preview */}
                        <div className="relative h-48 w-full bg-zinc-800 overflow-hidden">
                            {blog.image ? (
                                <Image
                                    src={blog.image.startsWith('/') || blog.image.startsWith('http') ? blog.image : `/uploads/blogs/${blog.image}`}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                    <FileText size={32} />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4 flex-1">
                                <div className="text-xs font-bold text-[#beff01] mb-2 uppercase tracking-wider">{blog.category}</div>
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{blog.title}</h3>
                                <p className="text-sm text-zinc-400 line-clamp-2">{blog.excerpt || blog.text.substring(0, 100)}...</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <div className="text-xs text-zinc-500 flex items-center gap-2">
                                    <Calendar size={14} />
                                    {new Date(blog.publicationDate || blog.createdAt).toLocaleDateString()}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link href={`/dashboard/blogs/${blog._id}`} className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-[#beff01] transition-colors" title="Edit">
                                        <Pencil size={18} />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteBlog(blog._id);
                                    }}>
                                        <button type="submit" className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {blogs.length === 0 && (
                    <div className="col-span-full p-12 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-3xl">
                        No blog posts found.
                    </div>
                )}
            </div>
        </div >
    );
}
