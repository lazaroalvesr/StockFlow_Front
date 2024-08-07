import { LinkRedirect } from "../lib/linkRedirect"
import LogoutButton from "./Logout"

export const DropdownMenu = () => {
    return (
        <div className="bg-white w-[140px] right-28 lg:right-0 bottom-44 lg:top-12 h-20 border rounded-md border-border absolute ">
            <div className="flex flex-col items-center pt-2 gap-2  ">
                <LinkRedirect href="/dashboard">
                    <p className="hover:bg-gray-100 px-4 rounded-md">
                        Dashboard
                    </p>
                </LinkRedirect>
                <LogoutButton />
            </div>
        </div>
    )
}