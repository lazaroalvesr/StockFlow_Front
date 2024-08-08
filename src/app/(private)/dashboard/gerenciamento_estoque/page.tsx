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
        <section>
            <div className="flex items-center m-auto lg:justify-between justify-center py-4 pl-4 border-b border-border">
                <h1 className="lg:text-2xl m-4 md:text-2xl text-base pl-4">Gerenciar Estoque</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-20 cursor-pointer lg:border border-border text-nowrap text-transparent lg:px-12 lg:py-1 lg:w-32 justify-center text-sm lg:text-base md:text-base rounded-md lg:bg-slate-200 lg:text-gray-600 lg:mr-5 mr-8">
                    Criar Tarefa
                    <Image
                        src="/icon/plus.svg"
                        alt="Icone criar pasta"
                        width={40}
                        height={40}
                        className="lg:hidden flex"
                    />
                </button>
            </div>
            <div className="mt-4 w-80 lg:w-full flex-wrap gap-4 mb-12 lg:mb-4 justify-center h-[500px] lg:h-[530px] overflow-y-scroll items-center  m-auto flex">
                {folders?.map((folder) => (
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
                                alt="Icone Deletar tarefa"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/**
 * 
 *  <section className="h-[650px] flex flex-col">
            <div className="flex justify-between items-center border-b pl-zz lg:pl-0">
                <h1 className="lg:text-lg m-4 md:text-2xl text-base w-44">Gerenciamento Estoque</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex cursor-pointer lg:border border-border w-0 text-transparent lg:w-32 justify-center text-sm lg:text-base md:text-base text-nowrap rounded-md lg:bg-slate-200 text-black lg:mr-20 mr-8">
                    Criar Pasta
                </button>
            </div>
            {folders && folders.length > 0 ? (
                <div className="flex m-4 mt-8 lg:w-[1100px]  md:w-[750px]  w-80 items-center lg:items-start lg:justify-normal justify-center  overflow-y-auto h-max flex-row  flex-wrap p-3 gap-x-4 gap-y-4">
                    {folders.map((folder) => (
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
 * 
 * 
 */