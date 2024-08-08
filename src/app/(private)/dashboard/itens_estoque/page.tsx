"use client"

import { ModalTask } from "@/app/_components/modalTask";
import { ModalTaskId } from "@/app/_components/modalTaskId";
import { BaseURL } from "@/app/api/api";
import { useAuth } from "@/app/lib/context/AuthContext";
import useFetch from "@/app/lib/hook/useFetch";
import { FolderProps, LiItensDoEstoqueIdProps } from "@/app/lib/interface";
import { LiTask } from "@/app/lib/LiTask";
import LoadingSpinner from "@/app/lib/LoadingSpinner";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ItensEstoque() {
    const { user, token } = useAuth();
    const [tasks, setTasks] = useState<LiItensDoEstoqueIdProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<LiItensDoEstoqueIdProps | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const { data: folders, loading, error } = useFetch<FolderProps[]>(`${BaseURL}folder/getAll/${user?.id}`);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${BaseURL}task/user/${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }

                const data: LiItensDoEstoqueIdProps[] = await response.json();

                setTasks(data);
            } catch (error) {
                console.error('Erro ao obter dados da pasta:', error);
            }
        };

        fetchTasks();
    }, [user?.id, token]);

    const HandleDelete = async (id: string) => {
        try {
            const response = await fetch(`${BaseURL}task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },

            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }

            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Erro ao apagar o item do estoque:', error);
        }
    };

    const handleTaskCreate = async (nome: string, text: string, pastaId: string, perecivel: boolean, dataValidade?: string, dataFabricacao?: string) => {
        try {
            const response = await fetch(`${BaseURL}task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token} ` } : {}),
                },
                body: JSON.stringify({
                    nome,
                    text,
                    pastaId,
                    perecivel,
                    dataValidade,
                    dataFabricacao,
                    usuarioId: user?.id,
                }),
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks((prevTasks) => [...prevTasks, newTask]);
            } else {
                console.log('Erro ao criar tarefa');
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    const handleTaskClick = (task: LiItensDoEstoqueIdProps) => {
        setSelectedTask(task);
        setIsViewModalOpen(true);
    };

    if (loading) return <LoadingSpinner />
    if (!tasks) return <p>Você não tem nenhum item no Estoque</p>

    return (
        <section>
            <div className="flex justify-between items-center border-b pl-12 pt-4 lg:pl-0">
                <h1 className="lg:text-2xl m-4 md:text-2xl text-base ">Itens do Estoque</h1>
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
            <div className="flex lg:ml-10 md:w-[700px] md:m-auto lg:w-[1100px] lg:h-[550px] h-[480px] overflow-y-scroll mb-4">
                <div className="w-full mt-3 flex-col flex h-0 gap-4">
                    {tasks.length ? '' : <p>Você não tem nenhum item criado</p>}
                    {tasks.map((item) => (
                        <LiTask
                            key={item.id}
                            nome={item.nome}
                            item={item}
                            onclick={() => handleTaskClick(item)}
                            handleDelete={() => HandleDelete(item.id)}
                            pasta={item}
                        />

                    ))}
                </div>
            </div>
            <ModalTask show={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleTaskCreate} folders={folders || []} />
            <ModalTaskId show={isViewModalOpen} task={selectedTask} onClose={() => setIsViewModalOpen(false)} folders={folders || []} />
        </section >
    )
}
