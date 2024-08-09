import Image from "next/image"
import Link from "next/link"

export const FeedBackUser = () => {
    return (
        <div className="bg-[#999b9e32]  lg:mt-32 mt-52 rounded-md md:mt-32 lg:w-[1114px] md:w-[780px] m-auto lg:h-64 mx-4 lg:m-auto md:m-auto pb-5">
            <div className="flex lg:flex-row flex-col md:flex-row items-center lg:px-16 gap-12">
                <div className="-mt-12 relative">
                    <Image
                        src="/img/cliente.png"
                        alt="Cliente"
                        width={240}
                        height={240}
                    />
                    <div className="absolute -bottom-8 shadow-md flex gap-2.5 md:-left-2 items-center justify-center bg-white w-56 lg:-left-2  left-2 rounded-md h-16">
                        <p className="font-bold text-black text-3xl pl-1">+300</p>
                        <p className="text-[9px] font-light">Empresas já transformaram seus negócios com o StockFlow.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:pt-12 pt-8 px-4 text-center lg:items-start md:items-start     md:text-start lg:text-start items-center">
                    <p className="font-bold text-black lg:text-2xl w-full text-sm md:text-base  lg:w-[700px] md:w-[500px]">Esqueça processos burocráticos e evite retrabalhos. Sua jornada rumo à eficiência na gestão do controle de estoque online começa com StockFlow!</p>
                    <Link href="/auth/register" className="bg-blue-700 text-white px-8 py-2 w-48 rounded-md">
                        Comece agora
                    </Link>
                </div>
            </div>
        </div>
    )
}