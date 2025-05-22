"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chatsidebar";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon | any;
  label: string;
  href: string;
  isActive: boolean;
};

export const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useChatSidebar((state) => state);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-10",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent",
      )}
    >
      <Link href={href}>
        <div className="flex items-center text-gray-500 gap-x-4">
          <Icon className={cn(
            "size-5",
            collapsed ? "mr-0" : "mr-2",
            isActive && "fill-emerald-500",
          )} />
          {!collapsed && (
            <span>
              {label}
            </span>
          )}
        </div>
      </Link>
    </Button>
  );
};
