import { ButtonProps } from "./interface"
import { LinkRedirect } from "./linkRedirect"

export const ButtonBGBlue = ({ href,text}: ButtonProps) => {

    return (
        <LinkRedirect href={href}>
            <button className="bg-[#0019F9] text-white text-[15px] px-4 py-2 rounded-md">
                {text}
            </button>
        </LinkRedirect>
    )
}

export const Button = ({ href,text}: ButtonProps) => {

    return (
        <LinkRedirect href={href}>
            <button className="border-[#0019F9] hover:bg-[#0019F9] hover:text-white transition-all duration-300 text-[15px] text-black border px-4 py-2 rounded-md">
                {text}
            </button>
        </LinkRedirect>
    )
}