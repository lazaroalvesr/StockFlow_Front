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
        <section className="lg:h-[650px] h-max pb-4 z-auto m-auto">
            <div className="border-b border-border py-4 lg:text-start text-end pr-5 lg:pr-0">
                <h1 className="font-bold ml-7 mb-1">Olá, {isClient ? user?.nome : ""}</h1>
                <p className="text-gray-500 ml-7 "> {dayName} {day} {monthName} de {fullYear}</p>
            </div>
            {loading ? (
                <LoadingDashboard />
            ) : (
                <div className="ml-7 mt-4 lg:w-[1100px]">
                    <div>
                        <div className="flex justify-between">
                            <h1 className="text-xl font-bold">Pastas</h1>
                            <Link href="/dashboard/gerenciamento_estoque" className="bg-gray-200 text-black px-4 rounded-md items-center justify-center flex mr-4 lg:mr-0">
                                Ver Mais
                            </Link>
                        </div>
                        <div className="lg:mt-0 mt-6 m-auto flex gap-2 lg:w-full lg:h-44 h-[270px] w-72 md:w-full overflow-hidden flex-wrap justify-center lg:justify-normal items-center">
                            {folders?.slice(0, 8).map((item) => (
                                <Link key={item.id} className="flex hover:scale-105 transition ease-in" href={`/dashboard/gerenciamento_estoque/${item.id}`}>
                                    <div className="w-[130px] h-[130px] rounded-md text-center flex justify-center items-center m-auto bg-gray-200">
                                        <p>{item.nome}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5 ">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-bold">Itens do Estoque</h1>
                            <Link href="/dashboard/itens_estoque" className="bg-gray-200 text-black px-4 rounded-md items-center justify-center flex mr-4 lg:mr-0">
                                Ver Mais
                            </Link>
                        </div>
                        <div className="mt-4 w-full ">
                            <ul className="lg:h-[239px] h-[170px] gap-2 flex flex-col overflow-hidden mr-4">
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
                </div>
            )}
        </section>
    );
};
