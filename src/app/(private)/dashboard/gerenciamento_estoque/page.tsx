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
    const router = useRouter();
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
                router.refresh();
                console.log('Pasta criada com sucesso');
            } else {
                console.log('Erro ao criar pasta');
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
            // Recarregar a página após a exclusão
            router.refresh();
        } catch (error) {
            console.error('Erro ao apagar a pasta:', error);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <section>
            <div className="flex items-center m-auto md:justify-between lg:justify-between justify-center py-2 pl-4 border-b border-border">
                <h1 className="lg:text-2xl m-4 md:text-2xl text-base pl-4">Gerenciar Estoque</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-20 cursor-pointer lg:border border-border text-nowrap text-transparent lg:px-12 lg:py-1 lg:w-32 justify-center text-sm lg:text-base md:text-base rounded-md lg:bg-slate-200 lg:text-gray-600 lg:mr-5 mr-8">
                    Criar Pasta
                    <Image
                        src="/icon/plus.svg"
                        alt="Ícone criar pasta"
                        width={40}
                        height={40}
                        className="lg:hidden flex"
                    />
                </button>
            </div>
            <div className="w-80 lg:w-[1100px] lg:ml-6 md:w-[700px] md:m-auto md:pt-12 md:mb-4 pl-8 mt-4 h-[500px] mb-4 overflow-y-scroll">
                <div className="flex gap-4 flex-wrap">
                    {folders && folders.length > 0 ? (
                        folders.map((folder) => (
                            <div className="relative h-fit cursor-pointer" key={folder.id}>
                                <Link href={`/dashboard/gerenciamento_estoque/${folder.id}`}>
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
                                        alt="Ícone Deletar pasta"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">Você não tem pastas criadas</p>
                    )}
                </div>
            </div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateFolder} />
        </section>
    );
}
