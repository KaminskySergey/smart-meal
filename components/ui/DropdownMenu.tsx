'use client';

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";


export default function DropdownMenu() {
    const session = useSession()
    console.log(session)
    return (


        <ul className="absolute right-0 z-50  w-40 bg-white border border-gray-300 rounded shadow-md mt-2 py-1">
            <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">New file</li>
            <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">Copy link</li>
            <li className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer">Edit file</li>
            <li className="px-4 py-2 hover:bg-red-500/10 text-red-500 ">
                <button className="cursor-pointer flex items-center gap-2" onClick={() => signOut()}>
                    <LogOut />
                    Logout
                </button>
            </li>
        </ul>
    );
}