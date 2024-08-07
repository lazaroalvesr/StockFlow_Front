'use client'

import { useAuth } from "@/app/lib/context/AuthContext"

export default function MinhaConta() {
    const { user } = useAuth()

    return (
        <section className="m-4">
            <h1>Miha Conta</h1>
            <p>{user?.nome}</p>
        </section>
    )
}