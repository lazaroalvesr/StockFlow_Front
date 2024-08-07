'use client'

import { BaseURL } from "@/app/api/api";
import { useAuth } from "@/app/lib/context/AuthContext";
import { useCurrentDayAndMonth } from "@/app/lib/getDate";
import useFetch from "@/app/lib/hook/useFetch";
import { FolderProps, TaskProps } from "@/app/lib/interface";
import { LiItensDoEstoque } from "@/app/lib/LiItensDoEstoque";
import { LoadingDashboard } from "@/app/lib/LoadingDashboard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const { user } = useAuth()
    const { dayName, day, fullYear, monthName } = useCurrentDayAndMonth();
    const { data: folders, loading, error } = useFetch<FolderProps[]>(`${BaseURL}folder/getAll/${user?.id}`);
    const { data: tasks } = useFetch<TaskProps[]>(`${BaseURL}task/user/${user?.id}`);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <article className="lg:w-[1140px]  flex flex-col">
            <div className="border-b border-border">
                <div className="m-3 lg:text-start text-end pr-7 lg:pr-0 ">
                    <p className="font-bold ml-7 mb-1">Olá, {isClient ? user?.nome : ""}</p>
                    <span className="text-gray-500 ml-7 "> {dayName} {day} {monthName} de {fullYear}</span>
                </div>
            </div>
            {loading ? (
                <LoadingDashboard />
            ) : (
                <>
                    <div className="lg:m-4 m-2 mt-4 flex flex-col ">
                        <div className="flex lg:items-center justify-between w-80 md:w-[750px] lg:w-full">
                            <h2 className="lg:text-2xl ml-5 text-xl">Gerenciamento de Estoque</h2>
                            <Link href="/dashboard/gerenciamento_estoque" className=" ml-5 text-nowrap h-9 text-sm px-2 items-center justify-center flex  bg-gray-200 text-black rounded-md">
                                Ver Mais
                            </Link>
                        </div>
                        <div className="lg:w-[1100px] w-80 md:w-[750px] flex gap-4 overflow-x-auto">
                            {folders && folders.length > 0 ? (
                                <div className="flex p-4 gap-4 items-center justify-center">
                                    {folders.map((folder) => (
                                        <Link key={folder.id} href={`/dashboard/gerenciamento_estoque/${folder.id}`}>
                                            <div className="flex lg:w-40 lg:h-40 w-36 h-36 relative text-center items-center justify-center  border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in">
                                                <p>{folder.nome}</p>
                                                <span className="absolute w-8 h-8 rounded-full border-2 bottom-1 right-2 bg-white flex items-center justify-center text-sm text-gray-700">
                                                    {folder._count.Tarefa}
                                                </span>
                                            </div>

                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="m-4 text-gray-500">Nenhuma pasta encontrada.</p>
                            )}
                        </div>
                    </div>
                    <div className="lg:ml-8 m-5 flex gap-4 flex-col md:w-[750px] mt-4 lg:mt-2 l">
                        <div className="flex justify-between items-center">
                            <h2 className="lg:text-2xl text-xl">Itens do Estoque</h2>
                            <Link href="/dashboard/itens_estoque" className=" ml-5 text-nowrap h-9 text-sm px-2 items-center justify-center flex  bg-gray-200 text-black rounded-md">
                                Ver Mais
                            </Link>
                        </div>
                        <div className="lg:mr-16 w-80 lg:w-full md:w-[750px] lg:-mt-2">
                            <ul className="flex flex-col gap-2 lg:h-[240px] h-[170px] md:h-[630px] overflow-hidden">
                                {tasks?.map((task) => (
                                    <LiItensDoEstoque
                                        id={task.id}
                                        key={task.id}
                                        titulo={task.nome}
                                        perecivel={task.perecivel}
                                        nomePasta={task.pasta.nome}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </article>
    );
};
