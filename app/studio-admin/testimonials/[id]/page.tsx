import TestimonialForm from "@/components/dashboard/TestimonialForm";
import { getTestimonial } from "@/app/actions/testimonials";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const testimonial = await getTestimonial(id);
    return <TestimonialForm initialData={testimonial} isEditing />;
}
