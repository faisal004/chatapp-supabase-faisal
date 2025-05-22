"use client"
import { ChevronDown } from "lucide-react"
import { MdChecklist,  MdPermMedia } from "react-icons/md";
import { IoChatbubbleEllipsesSharp, IoSettingsSharp, IoTicketSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { RiContactsBookFill } from "react-icons/ri";
import { SiGithubactions } from "react-icons/si";
import { FaList } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";

import { GrAnnounce } from "react-icons/gr";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled, TbStarsFilled } from "react-icons/tb";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-actions";

const items = [
  {
    title: "Home",
    url: "#",
    icon: AiFillHome

  },
  {
    title: "Chat",
    url: "#",
    icon: IoChatbubbleEllipsesSharp

  },
  {
    title: "Ticket",
    url: "#",
    icon: IoTicketSharp,
  },
  {
    title: "Analytics",
    url: "#",
    icon: FaChartLine,
  },
  {
    title: "Chat List",
    url: "#",
    icon: FaList,
  },
  {
    title: "Bulk Message",
    url: "#",
    icon: GrAnnounce,
  },
  {
    title: "Automation",
    url: "#",
    icon: SiGithubactions,
  },
  {
    title: "Contact",
    url: "#",
    icon: RiContactsBookFill,
  },
  {
    title: "Media",
    url: "#",
    icon: MdPermMedia,
  },
  {
    title: "Logs",
    url: "#",
    icon: MdChecklist,
  },
  {
    title: "Settings",
    url: "#",
    icon: IoSettingsSharp,
  },
]

import React, { useState } from "react";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar()
  const user = useCurrentUser();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!user) {
    return null;
  }

  const { name, email, avatar_url } = user.user_metadata;

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent className="hide-scrollbar overflow-y-auto">
        <SidebarHeader className="sticky top-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Select Workspace
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent
          >
            <SidebarMenu className="space-y-2" >
  {items.map((item, idx) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={`[&>svg]:size-5 font-bold ${activeIndex === idx ? "bg-gray-100 text-[#15803d] hover:text-[#15803d]" : "text-gray-500 hover:text-gray-700"} `}
        onClick={() => setActiveIndex(idx)}
      >
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pl-[7px]">
        <SidebarMenuItem className="list-none">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="[&>svg]:size-6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={avatar_url} />
                    <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "?"}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{name}</div>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top">
              <DropdownMenuLabel>
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-gray-500">{email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  className="w-full"
                  variant={"outline"}
                  onClick={() => {
                    signout();
                  }}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
        <SidebarMenuButton asChild className='[&>svg]:size-6'>
          <div className="cursor-pointer" >
            <TbStarsFilled />
            <span>What's New </span>
          </div>
        </SidebarMenuButton>
        <SidebarMenuButton asChild tooltip={open ? 'Collapse' : 'Expand'} className='[&>svg]:size-6'>
          <div className="cursor-pointer" onClick={() => {
            toggleSidebar()
          }}>
            {open ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarRightCollapseFilled size={20} />}
            <span>{open ? 'Collapse' : 'Expand'} </span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
