import Image from "next/image"
import { DivItemProps } from "../lib/interface"

export const DivItenTutorial = ({ src, alt, titulo, text }: DivItemProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex gap-4">
                <div className="bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center">
                    <Image
                        src={src}
                        alt={alt}
                        width={25}
                        height={25}
                    />
                </div>
                <div className="lg:w-[450px] w-72 md:w-96">
                    <p className="text-black font-bold">{titulo}</p>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}