import Image from "next/image"
import { DivItenTutorial } from "./DivItenTutorial"

export const TutorialUso = () => {
    return (
        <section className="lg:max-w-6xl m-auto lg:pt-20 pt-32">
            <div className="flex lg:flex-row md:flex-row flex-col w-full">
                <div className="lg:w-full md:ml-4 h-96 gap-4 flex flex-col items-center lg:items-start justify-center lg:justify-normal">
                    <DivItenTutorial
                        src="/icon/addItem.png"
                        alt="Icone addItem"
                        titulo="Cadastro rápido de itens no estoque"
                        text="Por isso, o controle de estoque e vendas do StockFlow permite cadastrar produtos em segundos, com foto, descrição, valor de custo, desconto e muito mais."
                    />
                    <DivItenTutorial
                        src="/icon/share.svg"
                        alt="Icone Compartilhar"
                        titulo="Adição de itens fracionados no estoque"
                        text="Adicione mercadorias por unidade, grama, quilo, litro ou metro, e a quantidade em estoque é atualizada automaticamente, oferecendo mais controle para o seu negócio."
                    />
                    <DivItenTutorial
                        src="/icon/select.svg"
                        alt="Icone addItem"
                        titulo="Acompanhe as entradas e saídas do estoque"
                        text="Monitore de perto as entradas e saídas do estoque com StockFlow, evitando erros de planejamento e gastos desnecessários. O StockFlow é seu maior aliado na gestão financeira do seu negócio."
                    />
                </div>
                <div className="w-full lg:flex hidden md:flex h-full lg:ml-48 md:ml-0">
                    <Image
                        src="/img/mac.png"
                        alt="Foto Notebook"
                        width={200}
                        height={200}
                        className="md:w-[360px] md:h-full  lg:h-full lg:w-[420px]"
                    />
                </div>
            </div>
        </section>
    )
}