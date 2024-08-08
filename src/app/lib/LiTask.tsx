import Image from "next/image"
import { LiTaskProps } from "./interface"

export const LiTask = ({ key, nome, item, onclick, handleDelete, pasta }: LiTaskProps) => {
    return (
        <div key={key} className="bg-white  items-center lg:w-full  w-[290px] m-auto md:w-full shadow-md rounded-md p-2.5 border border-border lg:gap-4 gap-2 justify-between flex cursor-pointer">
            <li onClick={onclick} className="flex justify-between lg:w-full w-72 md:w-full items-center ">
                <div className="flex gap-4 h-8 items-center overflow-hidden">
                    <p className="lg:text-base text-sm lg:w-44  w-24 truncate">{nome}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex lg:gap-6 gap-4">
                        {item.perecivel && (
                            <p className="bg-emerald-400 text-white rounded-md px-3 py-0.5 items-center justify-center flex gap-2 lg:text-base text-xs">
                                Perecível
                            </p>
                        )}
                    </div>
                    <div className="flex w-4">
                        <Image
                            src="/icon/eye.svg"
                            alt="Icone Olho"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            </li>
            <div className="flex items-center gap-4">
                {pasta?.nome ? (
                    <div className="flex bg-gray-100 rounded-md text-center lg:w-32 w-8  items-center justify-center">
                        <p className="lg:w-16 truncate lg:text-base w-0 ">{pasta?.nome}</p>
                        <Image
                            src="/icon/folder.svg"
                            alt="Ícone de uma pasta"
                            width={18}
                            height={18}
                        />
                    </div>
                ) : ""}
                <button onClick={handleDelete} className="lg:flex hidden">
                    <Image
                        src="/icon/trash.svg"
                        alt="Icone Deletar tarefa"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </div>
    )
}