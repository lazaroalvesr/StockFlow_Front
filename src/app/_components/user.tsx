import Image from "next/image";
import { DropdownMenu } from "./dropdownMenu";
import { useState } from "react";

export default function User({ user }: { user: string }) {
    const [dropdown, setDropdown] = useState(false)

    function toolMenu() {
        setDropdown(!dropdown)
    }

    return (
        <div className="flex items-center gap-1 top-7 cursor-pointer" onClick={toolMenu}>
            {user}
            <Image
                src="/icon/user.svg"
                alt="User icon"
                width={30}
                height={30}
            />
            {dropdown ? <DropdownMenu /> : ''}
        </div>
    )
}