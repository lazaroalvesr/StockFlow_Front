import { DashboardLayout } from "@/app/_components/DashboardLayout";
import { DashboardUser } from "@/app/_components/DashboardUser";
import { DashItensLayout } from "@/app/_components/DashItensLayout";

export default function LayoutDashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardLayout>
            <DashboardUser />
            <DashItensLayout>
                {children}
            </DashItensLayout>
        </DashboardLayout>
    );
}
