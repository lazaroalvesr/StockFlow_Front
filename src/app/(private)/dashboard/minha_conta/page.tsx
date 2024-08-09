'use client'

import { ModalUpdateUser } from "@/app/_components/ModalUpdateUser"
import { BaseURL } from "@/app/api/api"
import { useAuth } from "@/app/lib/context/AuthContext"
import Image from "next/image"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

export default function MinhaConta() {
    const { user, token } = useAuth()
    const [isClient, setIsClient] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleUpdateUser = async (nome: string, email: string) => {
        try {
            const response = await fetch(`${BaseURL}auth/update/${user?.id}`, {
                next: {
                    revalidate: 1
                },
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token} ` } : {}),
                },
                body: JSON.stringify({
                    nome,
                    email,
                }),
            });

            if (response.ok) {
                const data = await response.json()
                Cookies.set('access_token', data.acess_token, {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    expires: 7,
                });
            } else {
                console.log('Erro ao criar tarefa');
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        console.log('Deleting user with ID:', id); 

        if (!id) {
            console.error('ID is undefined');
            return;
        }

        try {
            const response = await fetch(`${BaseURL}auth/${id}`, {
                next: {
                    revalidate: 1
                },
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                }
            });

            if (response.ok) {
                const data = await response.json()
                Cookies.remove('access_token');
            } else {
                console.log('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error while deleting user:', error);
        }
    };


    return (
        <section>
            <div className="flex border-b pt-7 pb-4 lg:py-5 pl-12 lg:pl-6">
                <h1 className="lg:text-2xl md:text-2xl text-base ">Minha Conta</h1>
            </div>
            <div className="m-5">
                <h1 className="text-xl font-bold">Informações Pessoais</h1>
                <div className="flex gap-4 mt-4">
                    <p>Foto do Perfil</p>
                    <div className="
                    border flex items-center justify-center
                     border-gray-300 w-28 h-28 rounded-full">
                        <Image
                            src="/icon/user.svg"
                            alt="Icone user"
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
                <div>
                    <ul className="mt-4 flex flex-col gap-4">
                        <li className="flex flex-col w-full ">
                            Nome
                            <span className="border border-border rounded-md p-3 mt-2">{isClient ? user?.nome : ""}</span>
                        </li>
                        <li className="flex flex-col w-full ">
                            Email
                            <span className="border border-border rounded-md p-3 mt-2">{isClient ? user?.email : ""}</span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-between">
                    <button className="bg-gray-300 p-2 rounded-md mt-4 text-black" onClick={() => setIsModalOpen(true)}>Editar Perfil</button>
                    <button className="bg-red-600 p-2 rounded-md mt-4 text-white" onClick={() => handleDelete(user?.id)}>Deletar Conta</button>
                </div>
            </div>
            <ModalUpdateUser show={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleUpdateUser} />
        </section>
    )
}