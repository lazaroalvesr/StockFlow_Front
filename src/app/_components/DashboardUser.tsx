'use client'

import Image from "next/image"
import { useAuth } from "../lib/context/AuthContext"
import { LiDashboardUser } from "../lib/ItensDashboardUser";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";

export const DashboardUser = () => {
    const { user } = useAuth();
    const [ativo, setAtivo] = useState(false);
    const [isClient, setIsClient] = useState(false)

    function toggle() {
        setAtivo(!ativo);
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    function handleItemClick() {
        setAtivo(false);
    }

    return (
        <aside className={`lg:w-[378px] h-full w-0 lg:h-auto lg:static `}>
            <div className={`lg:h-auto ${ativo ? "bg-[#f5f7f9]  h-full absolute top-0 border-r border-gray-300 z-20 w-" : "h-0 overflow-hidden "}`}>
                <button onClick={toggle} className="lg:hidden absolute right-0 top-8 w-12">
                    {ativo ? (
                        <div className="ml-0">
                            <Image
                                src="/icon/x.svg"
                                alt="fechar menu"
                                width={28}
                                height={28}
                            />
                        </div>
                    ) : ""}
                </button>
                <div className="flex flex-col my-6 mx-4">
                    <div className="flex items-center gap-4 border-b pb-4">
                        <Image
                            src="/icon/Icone.svg"
                            alt="Icone do site"
                            width={28}
                            height={28}
                        />
                        <div className="flex flex-col">
                            <p className="font-bold lg:w-44 w-32 truncate">{isClient ? user?.nome : ""}</p>
                            <span className="text-xs">{isClient ? user?.email : ""}</span>
                        </div>
                    </div>
                    <div className="pt-4 lg:w-72">
                        <ul className="gap-2 flex flex-col">
                            <LiDashboardUser
                                href="/dashboard"
                                path="/dashboard"
                                src="/icon/home.svg"
                                alt="Icone do Dashboard"
                                text="Dashboard"
                                onClick={handleItemClick}
                            />
                            <LiDashboardUser
                                href="/dashboard/gerenciamento_estoque"
                                path="/dashboard/gerenciamento_estoque"
                                src="/icon/folder.svg"
                                alt="Icone de uma pasta"
                                text="Gerenciamento de Estoque"
                                onClick={handleItemClick}
                            />
                            <LiDashboardUser
                                href="/dashboard/itens_estoque"
                                path="/dashboard/itens_estoque"
                                src="/icon/list.svg"
                                alt="Icone dos Itens"
                                text="Itens do Estoque"
                                onClick={handleItemClick}
                            />
                            <LiDashboardUser
                                href="/dashboard/suporte"
                                path="/dashboard/suporte"
                                src="/icon/message.svg"
                                alt="Icone Suporte"
                                text="Suporte"
                                onClick={handleItemClick}
                            />
                            <LiDashboardUser
                                href="/dashboard/minha_conta"
                                path="/dashboard/minha_conta"
                                src="/icon/user.svg"
                                alt="Icone da minha conta"
                                text="Minha Conta"
                                onClick={handleItemClick}
                            />
                            <li className="ml-0">
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="absolute left-8 top-10 lg:hidden" onClick={toggle}>
                <Image
                    src="/icon/menu.svg"
                    alt="abrir menu"
                    width={28}
                    height={28}
                />
            </div>
        </aside>
    );
};
