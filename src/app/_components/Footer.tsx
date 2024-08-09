import Image from "next/image"

export const Footer = () => {
    return (
        <div className="bg-[#27303D] mt-32">
            <footer className="lg:max-w-6xl md:mx-12 lg:mx-auto pb-3 m-auto pt-12 ml-12">
                <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between lg:items-center">
                    <div className="flex items-center lg:pl-0 ">
                        <Image
                            src="/icon/Icone.svg"
                            alt="Icone StockFlow"
                            width={45}
                            height={45}
                        />
                        <h3 className="italic text-[20px] text-white">StockFlow</h3>
                    </div>
                    <div>
                        <p className="font-bold text-white text-lg">Atendimento</p>
                        <p className="text-[#D9D9D9] text-sm">Segunda a sexta das 8h30 às 17h30</p>
                    </div>
                    <div>
                        <p className="font-bold text-white text-lg items-center lg:text-center  justify-center">Redes Sociais</p>
                        <div className="flex mt-2 gap-2">
                            <div>
                                <Image
                                    src="/icon/insta.svg"
                                    alt="Icone instagram"
                                    width={35}
                                    height={35}
                                />
                            </div>
                            <div>
                                <Image
                                    src="/icon/face.svg"
                                    alt="Icone instagram"
                                    width={35}
                                    height={35}
                                />
                            </div>
                            <div>
                                <Image
                                    src="/icon/yt.svg"
                                    alt="Icone instagram"
                                    width={35}
                                    height={35}
                                />
                            </div>
                            <div>
                                <Image
                                    src="/icon/twitter.svg"
                                    alt="Icone instagram"
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-[#D9D9D9] pt-12 text-xs">Copyright © 2024 StockFlow. Todos os direitos reservados</p>
            </footer>
        </div>
    )
}