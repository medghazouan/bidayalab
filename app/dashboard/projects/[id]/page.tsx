import ProjectForm from "@/components/dashboard/ProjectForm";
import { getProject } from "@/app/actions/projects";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return <div>Project not found</div>;
    }

    return <ProjectForm initialData={project} isEditing={true} />;
}
