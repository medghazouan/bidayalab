import { auth } from "@/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const userName = session?.user?.name || "Admin";

    return (
        <DashboardShell userName={userName}>
            {children}
        </DashboardShell>
    );
}
