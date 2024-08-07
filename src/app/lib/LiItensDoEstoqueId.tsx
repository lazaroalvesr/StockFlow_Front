import Image from "next/image";
import { LiItensDoEstoqueIdProps } from "./interface";
import Link from "next/link";

export const LiItensDoEstoqueId = ({ nome, perecivel, id }: LiItensDoEstoqueIdProps) => {
    return (
        <Link href={id}>
            <li className="bg-white items-center lg:w-full shadow-md rounded-md p-3 border border-border justify-between flex cursor-pointer">
                <div className="flex gap-4">
                    <p className="lg:text-base text-sm">{nome}</p>
                </div>
                <div className="flex lg:gap-6 gap-4">
                    {perecivel && (
                        <p className="bg-emerald-400 text-white rounded-md px-3 py-0.5 items-center justify-center flex gap-2 lg:text-base text-xs">
                            Perecível
                        </p>
                    )}
                    <div className="flex gap-4">
                        <div>
                            <Image
                                src="/icon/edit.svg"
                                alt="Icone Edit"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
};
