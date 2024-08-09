'use client'

import { Button, ButtonBGBlue } from "@/app/lib/Button"
import { HeaderLi } from "@/app/lib/LiHeader"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAuth } from "../lib/context/AuthContext"
import User from "./user"

export const Header = () => {
    const { user } = useAuth()
    const [ativo, setAtivo] = useState(false)
    const [isClient, setIsClient] = useState(false)

    console.log(user?.nome)
    function toggle() {
        setAtivo(!ativo)
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <header className="shadow-md ">
            <div className="lg:max-w-6xl m-auto h-20 justify-between items-center flex">
                <div className="flex lg:relative items-center lg:gap-20 gap-0 md:gap-8 justify-center lg:m-auto md:m-auto">
                    <div className="flex items-center pl-4 lg:pl-0">
                        <Image
                            src="/icon/Icone.svg"
                            alt="Icone StockFlow"
                            width={45}
                            height={45}
                        />
                        <h3 className="italic text-[20px]">StockFlow</h3>
                    </div>
                    <button className="lg:hidden md:hidden absolute right-0 pr-4" onClick={toggle} aria-label="Menu Mobile">
                        {ativo ? <Image src="/icon/x.svg" alt="Icone fechar menu" width={30} height={30} />
                            : <Image src="/icon/menu.svg" alt="Icone fechar menu" width={30} height={30} />}
                    </button>
                    <nav className={`flex lg:h-auto md:h-auto items-center ${ativo ? 'absolute flex-col left-0 flex w-full h-[600px] bg-white top-20 pt-32 text-xl' : "h-0 overflow-hidden"}`}>
                        <ul className="flex gap-4 md:flex-row md:pb-0 pb-12 lg:pb-0 items-center lg:flex-row flex-col">
                            <HeaderLi href="/" text="Funcionalidades" />
                            <HeaderLi href="/" text="Sobre" />
                            <HeaderLi href="/" text="Planos" />
                        </ul>
                        <div className="gap-4 flex lg:flex-row md:flex-row flex-col lg:ml-[350px] md:ml-12">
                            {isClient ? (
                                user ? (
                                    <User user={user.nome} />
                                ) : (
                                    <div className="gap-4 flex lg:flex-row flex-col items-center">
                                        <Button href="/auth/login" text="Login" />
                                        <ButtonBGBlue href="/auth/register" text="Assinar StockFlow" />
                                    </div>
                                )
                            ) : null}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
