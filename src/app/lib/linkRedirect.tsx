import Link from "next/link"
import { LinkRedirectProps } from "./interface"

export const LinkRedirect = ({ href, children }: LinkRedirectProps) => {
    return (
        <Link href={href} className="cursor-pointer">
            {children}
        </Link>
    )
}