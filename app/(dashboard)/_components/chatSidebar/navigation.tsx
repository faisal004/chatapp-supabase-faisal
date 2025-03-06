"use client";

import { usePathname } from "next/navigation";
import {
    Bell,
    FileText,
    Globe,
    Settings,
    Shield,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";
import { NavItem } from "./nav-items";



export const Navigation = () => {
    const pathname = usePathname();

    const routes = [
      
        {
            label: "Trending",
            href: `#3`,
            icon: TrendingUp,
        },
        {
            label: "Users",
            href: `#4`,
            icon: Users,
        },
        {
            label: "Settings",
            href: `#5`,
            icon: Settings,
        },
        {
            label: "Notifications",
            href: `#6`,
            icon: Bell,
        },
        {
            label: "Documents",
            href: `#7`,
            icon: FileText,
        },
        {
            label: "World",
            href: `#8`,
            icon: Globe,
        },
        {
            label: "Favorites",
            href: `#9`,
            icon: Star,
        },
        {
            label: "Security",
            href: `#10`,
            icon: Shield,
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