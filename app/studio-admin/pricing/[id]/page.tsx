import PricingForm from "@/components/dashboard/PricingForm";
import { getPricingPlan } from "@/app/actions/pricing";

export default async function EditPricingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const plan = await getPricingPlan(id);
    return <PricingForm initialData={plan} isEditing />;
}
