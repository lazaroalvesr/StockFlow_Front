import Image from "next/image";
import { LiItensDoEstoqueProps } from "./interface";
import Link from "next/link";

export const LiItensDoEstoque = ({ titulo, nomePasta, perecivel, id }: LiItensDoEstoqueProps) => {
    return (
        <Link href={id}>
            <li className="bg-white items-center lg:w-full shadow-md rounded-md p-3 border border-border flex justify-between cursor-pointer">
                <p className="lg:text-base text-sm lg:w-32 w-24  truncate">{titulo}</p>
                <div className="flex lg:gap-6 gap-4">
                    {perecivel && (
                        <p className="bg-emerald-400 text-white rounded-md px-3 py-0.5  items-center justify-center flex gap-2 lg:text-base text-xs">
                            Perecível
                        </p>
                    )}
                    <div className="flex bg-gray-100 rounded-md text-center lg:w-32 w-8  items-center justify-center">
                        <p className="lg:w-16 truncate lg:text-base w-0 ">{nomePasta}</p>
                        <Image
                            src="/icon/folder.svg"
                            alt="Ícone de uma pasta"
                            width={18}
                            height={18}
                        />
                    </div>
                </div>
            </li>
        </Link>
    );
};
