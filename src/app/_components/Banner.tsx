import Image from "next/image"

export const Banner = () => {
    return (
        <section className="m-auto mt-32 flex mb-12  items-center justify-center">
            <div className="bg-[#999b9e32] lg:w-[1114px] mx-4 rounded-md">
                <div className="lg:px-20 px-4 py-12 gap-4 flex flex-col">
                    <h1 className="text-[#363F4D] font-bold md:text-2xl md:w-full lg:text-2xl text-[14px] w-80 lg:w-full m-auto text-center">StockFlow: Simplifique seu Controle de Estoque e Impulsione a Eficiência com Facilidade</h1>
                    <p className="text-black lg:text-sm text-xs text-center md:text-sm font-light">O StockFlow é um sistema de vendas e estoque repleto de funcionalidades que vão transformar sua rotina de trabalho e elevar a qualidade do serviço prestado aos seus clientes.</p>
                    <div className="flex lg:flex-row md:flex-row flex-col gap-y-4 lg:gap-4 mt-12 items-center justify-center">
                        <div className="flex flex-col items-center">
                            <Image
                                src="/icon/Garage.svg"
                                alt="Icone"
                                width={28}
                                height={28}
                            />
                            <p className="text-center pt-1 text-[#999B9E] text-[17px]">Cadastro rápido de itens no estoque</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Image
                                src="/icon/caixa-de-papelao.png"
                                alt="Icone"
                                width={28}
                                height={28}
                            />
                            <p className="text-center pt-1 text-[#999B9E] text-[17px]">Controle de estoque e atualização em tempo real</p>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Image
                                src="/icon/armario-de-enchimento.png"
                                alt="Icone"
                                width={28}
                                height={28}
                            />
                            <p className="text-center pt-1 text-[#999B9E] text-[17px]">Programa completo com totalizador de estoque </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}