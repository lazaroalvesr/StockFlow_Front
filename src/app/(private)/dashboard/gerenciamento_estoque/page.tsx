'use client'

import { Modal } from "@/app/_components/modal";
import { BaseURL } from "@/app/api/api";
import { useAuth } from "@/app/lib/context/AuthContext";
import useFetch from "@/app/lib/hook/useFetch";
import { FolderProps } from "@/app/lib/interface";
import LoadingSpinner from "@/app/lib/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function GerenciamentoEstoque() {
    const router = useRouter()
    const { user, token } = useAuth();
    const { data: folders, loading, error } = useFetch<FolderProps[]>(`${BaseURL}folder/getAll/${user?.id}`);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateFolder = async (nome: string) => {
        try {
            const response = await fetch(`${BaseURL}folder/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    nome,
                    usuarioId: user?.id,
                }),
            });

            if (response.ok) {
                router.refresh()
                console.log('crio')
            } else {
                console.log('erro')
            }
        } catch (error) {
            console.error('Erro ao criar pasta:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${BaseURL}folder/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao apagar o item do estoque:', error);
        }
    };

    if (loading) return <LoadingSpinner />

    return (
        <section className="h-[650px] flex flex-col z-30">
            <div className="flex justify-between items-center border-b pl-12 lg:pl-0">
                <h1 className="lg:text-lg m-4 md:text-2xl">Gerenciamento Estoque</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex cursor-pointer border border-border w-20 lg:w-32 justify-center text-sm lg:text-base md:text-base text-nowrap px-12 py-1 rounded-md bg-slate-200 text-black lg:mr-20 mr-8">
                    Criar Pasta
                </button>
            </div>
            {folders && folders.length > 0 ? (
                <div className="flex m-4 mt-8 lg:w-[1100px]  md:w-[750px]  w-80 items-center lg:items-start lg:justify-normal justify-center  overflow-y-auto h-max flex-row  flex-wrap p-3 gap-x-4 gap-y-4">
                    {folders.map((folder) => (
                        <div className="relative h-fit cursor-pointer">
                            <Link key={folder.id} href={`/dashboard/gerenciamento_estoque/${folder.id}`}>
                                <div className="flex lg:w-40 lg:h-40 w-32 h-32 text-center items-center justify-center border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in">
                                    <p>{folder.nome}</p>
                                    <span className="absolute w-8 h-8 rounded-full border-2 bottom-1 right-2 bg-white flex items-center justify-center text-sm text-gray-700">
                                        {folder._count.Tarefa}
                                    </span>
                                </div>
                            </Link>
                            <div className="absolute bottom-4 left-4 cursor-pointer" onClick={() => handleDelete(folder.id)}>
                                <Image
                                    src="/icon/trash.svg"
                                    alt="Icone Deletar tarefa"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="m-4 text-gray-500">Nenhuma pasta encontrada.</p>
            )}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateFolder} />
        </section>
    );
}
