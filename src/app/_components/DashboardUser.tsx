'use client'

import Image from "next/image"
import { useAuth } from "../lib/context/AuthContext"
import { LiDashboardUser } from "../lib/ItensDashboardUser";
import { useEffect, useState } from "react";

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
        <aside className={`lg:w-[378px] h-full lg:h-auto lg:static absolute`}>
            <div className={`lg:h-auto ${ativo ? "bg-[#f5f7f9] z-30 h-full absolute w-72 top-0 border-r border-gray-300" : "h-0 overflow-hidden w-auto"}`}>
                <button onClick={toggle} className="lg:hidden absolute right-0 top-8 w-3">
                    {ativo ? (
                        <div className="-ml-9">
                            <Image
                                src="/icon/x.svg"
                                alt="fechar menu"
                                width={28}
                                height={28}
                            />
                        </div>
                    ) : (
                        <div className="-ml-56 mt-2">
                            <Image
                                src="/icon/menu.svg"
                                alt="abrir menu"
                                width={28}
                                height={28}
                            />
                        </div>
                    )}
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
                            <p className="font-bold">{isClient ? user?.nome : ""}</p>
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
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};
