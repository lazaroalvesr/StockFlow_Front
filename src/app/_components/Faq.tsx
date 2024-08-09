"use client"

import { useState } from "react"
import Suporte from "../(private)/dashboard/suporte/page"
import Image from "next/image"

interface Faq {
    id: number
    title: string
    text: string
}

const faqs: Faq[] = [
    { id: 1, title: "O que é o StockFlow?", text: "O StockFlow é uma API para gerenciamento de estoque, permitindo organizar e controlar seus itens facilmente." },
    { id: 2, title: "Como faço para criar uma conta?", text: "Você pode criar uma conta clicando no botão 'Registrar' e preenchendo as informações solicitadas." },
    { id: 3, title: "Posso criar várias pastas para organizar meu estoque?", text: "Sim, o StockFlow permite que você crie múltiplas pastas para melhor organizar seus itens." },
    { id: 4, title: "O StockFlow oferece autenticação segura?", text: "Sim, usamos JWT para garantir que sua conta esteja sempre segura." },
    { id: 5, title: "Como edito um item no meu estoque?", text: "Você pode editar itens acessando a rota de itens do estoque e selecionando a opção 'Editar' para o item desejado." },
    { id: 6, title: "O StockFlow é gratuito?", text: "Sim, você pode usar o StockFlow gratuitamente com as funcionalidades básicas." },
    { id: 7, title: "Como crio um item no meu estoque?", text: "Para criar um item, é obrigatório ter uma pasta. Primeiro, crie uma pasta e depois adicione o item dentro dela." },
]

export const Faq = () => {

    const [openFaqs, setOpenFaqs] = useState<{ [key: string]: boolean }>({})

    function toggleFaq(id: number) {
        setOpenFaqs((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    return (
        <div className="lg:mt-32 mt-20 m-auto lg:max-w-6xl justify-center items-center">
            <p className="text-black font-bold text-center lg:text-3xl text-2xl">Perguntas Frequentes</p>
            <div className="flex gap-4 flex-col mt-12 mx-4 lg:mx-0  ">
                {faqs.map((item) => (
                    <li key={item.id} className="w-full flex-col py-2 bg-white shadow-md border flex justify-between px-4  border-border rounded-md cursor-pointer" onClick={() => toggleFaq(item.id)}>
                        <span className="w-full font-bold text-sm lg:text-base flex justify-between pb-2 items-center">
                            {item.title}
                            {openFaqs[item.id] ? (
                                <Image src="/icon/chevron-up.svg" alt="Icone seta para cima" width={30} height={30} />
                            ) : (
                                <Image src="/icon/chevron-down.svg" alt="Icone seta para baixo" width={30} height={30} />
                            )}
                        </span>
                        {openFaqs[item.id] ? (
                            <div className="pt-2 border-t text-sm border-border">
                                {item.text}
                            </div>
                        ) : ""}
                    </li>
                ))}
            </div>
        </div>
    )
}