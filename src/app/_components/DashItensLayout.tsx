import { ReactNode } from "react"

export const DashItensLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="bg-white rounded-xl m-4 w-full shadow-md ">
            {children}
        </main>
    )
}