'use client'

import { useEffect, useState } from "react";
import { BaseURL } from "@/app/api/api";
import { useAuth } from "@/app/lib/context/AuthContext";
import { GerenciamentoEstoqueProps, LiItensDoEstoqueIdProps, PastaTarefasProps } from "@/app/lib/interface";
import { LiTask } from "@/app/lib/LiTask";
import { ModalTaskId } from "@/app/_components/modalTaskId";

export default function GerenciamentoEstoqueID({ params: { id } }: GerenciamentoEstoqueProps) {
    const { token } = useAuth();
    const [task, setTask] = useState<PastaTarefasProps | null>(null);
    const [selectedTask, setSelectedTask] = useState<LiItensDoEstoqueIdProps | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`${BaseURL}folder/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }

                const data: PastaTarefasProps = await response.json();
                setTask(data);
            } catch (error) {
                console.error('Erro ao obter dados da pasta:', error);
            }
        };

        fetchTask();
    }, [id, token]);

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
        } catch (error) {
            console.error('Erro ao apagar o item do estoque:', error);
        }
    };

    const handleTaskClick = (task: LiItensDoEstoqueIdProps) => {
        setSelectedTask(task);
        setIsViewModalOpen(true);
    };

    if (!task) return <p>Carregando...</p>;

    return (
        <section>
            <div className="border-b">
                <h1 className="m-4 text-lg font-bold lg:text-start text-end">{task.nome}</h1>
            </div>
            <div className="gap-4 flex flex-col m-4">
                {task.Tarefa.length > 0 ? (
                    task.Tarefa.map((item) => (
                        <LiTask
                            key={item.id}
                            nome={item.nome}
                            item={item}
                            onclick={() => handleTaskClick(item)}
                            handleDelete={() => HandleDelete(item.id)}
                        />
                    ))
                ) : (
                    <p>Nenhum item na pasta</p>
                )}
            </div>
            {selectedTask && (
                <ModalTaskId show={isViewModalOpen} task={selectedTask} onClose={() => setIsViewModalOpen(false)} />
            )}
        </section>
    );
}
