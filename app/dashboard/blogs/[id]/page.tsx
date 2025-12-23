import BlogForm from "@/components/dashboard/BlogForm";
import { getBlog } from "@/app/actions/blogs";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlog(id);
    return <BlogForm initialData={blog} isEditing />;
}
