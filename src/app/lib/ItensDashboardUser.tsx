import Image from "next/image"
import { usePathname } from "next/navigation"
import { ItemDashboardUser } from "./interface";
import { LinkRedirect } from "./linkRedirect";

export const LiDashboardUser = ({ alt, path, src, text, href, onClick }: ItemDashboardUser) => {
    const pathname = usePathname();

    return (
        <LinkRedirect href={href}>
            <li onClick={onClick} className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-white rounded-xl text-sm lg:text-base ${pathname === `${path}` ? 'bg-white rounded-xl' : ''}`}>
                <Image
                    src={src}
                    alt={alt}
                    width={20}
                    height={20}
                />
                {text}
            </li>
        </LinkRedirect>
    )
}
