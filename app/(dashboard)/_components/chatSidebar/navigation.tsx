"use client";

import { usePathname } from "next/navigation";

import { NavItem } from "./nav-items";
import { FiRefreshCcw } from "react-icons/fi";
import { LuGrid2X2Check, LuPencilLine } from "react-icons/lu";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoIosFolderOpen } from "react-icons/io";
import { RiListIndefinite } from "react-icons/ri";



export const Navigation = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: "Refresh", // FiRefreshCcw (refresh/rotate arrows)
            href: `#3`,
            icon: FiRefreshCcw,
        },
        {
            label: "Edit", // LuPencilLine (pencil/edit)
            href: `#4`,
            icon: LuPencilLine,
        },
        {
            label: "List", // RiListIndefinite (list)
            href: `#5`,
            icon: RiListIndefinite,
        },
        {
            label: "Dashboard", // LuGrid2X2Check (grid/dashboard)
            href: `#6`,
            icon: LuGrid2X2Check,
        },
        {
            label: "Users", // FaUsers (users/people)
            href: `#7`,
            icon: FaUsers,
        },
        {
            label: "Email", // MdOutlineAlternateEmail (email/@)
            href: `#8`,
            icon: MdOutlineAlternateEmail,
        },
        {
            label: "Folder", // IoIosFolderOpen (folder)
            href: `#9`,
            icon: IoIosFolderOpen,
        },
        {
            label: "New",
            href: "#10",
            icon: HiOutlineMenuAlt1
        }
    ];


    return (
        <div id="sidebar" className=" flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden  h-full">
            <ul className="space-y-1 px-2  pt-4 lg:pt-0">
                {routes.map((route) => (
                    <NavItem
                        key={route.href}
                        label={route.label}
                        icon={route.icon}
                        href={route.href}
                        isActive={pathname === route.href}
                    />
                ))}

            </ul>

        </div>

    );
};