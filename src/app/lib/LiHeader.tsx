import Image from "next/image"
import { LinkRedirect } from "./linkRedirect"
import { HeaderLiProps } from "./interface"

export const HeaderLi = ({href,text}: HeaderLiProps) => {
    return (
        <LinkRedirect href={href}>
            <li className="flex gap-1">{text}
                <Image
                    src="/icon/ArrowDomn.svg"
                    alt="Icone seta"
                    width={14}
                    height={14}
                />
            </li>
        </LinkRedirect>
    )
}