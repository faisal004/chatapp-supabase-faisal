"use client";

import { usePathname } from "next/navigation";
import {
    Bell,
    FileText,
    Globe,
    Settings,
    Shield,
    Star,
    Users,
} from "lucide-react";
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
            label: "Trending",
            href: `#3`,
            icon: FiRefreshCcw,
        },
        {
            label: "Users",
            href: `#4`,
            icon: LuPencilLine,
        },
        {
            label: "Settings",
            href: `#5`,
            icon: RiListIndefinite,
        },
        {
            label: "Notifications",
            href: `#6`,
            icon: LuGrid2X2Check,
        },
        {
            label: "Documents",
            href: `#7`,
            icon: FaUsers,
        },
        {
            label: "World",
            href: `#8`,
            icon: MdOutlineAlternateEmail,
        },
        {
            label: "Favorites",
            href: `#9`,
            icon: IoIosFolderOpen,
        },
        
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