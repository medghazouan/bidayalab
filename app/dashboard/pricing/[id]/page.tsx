import PricingForm from "@/components/dashboard/PricingForm";
import { getPricingPlan } from "@/app/actions/pricing";

export default async function EditPricingPage({ params }: { params: { id: string } }) {
    const plan = await getPricingPlan(params.id);
    return <PricingForm initialData={plan} isEditing />;
}
