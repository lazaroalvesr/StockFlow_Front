import { ReactNode } from "react"

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className="bg-[#f5f7f9] flex h-screen">
            {children}
        </section>
    )
}