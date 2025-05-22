"use client"
import { Calendar, ChevronDown, Home, HomeIcon, Inbox, PanelLeftIcon, Search, Settings } from "lucide-react"
import { MdChecklist, MdHome, MdPermMedia } from "react-icons/md";
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
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
    icon: MdPermMedia ,
  },
  {
    title: "Logs",
    url: "#",
    icon: MdChecklist ,
  },
  {
    title: "Settings",
    url: "#",
    icon: IoSettingsSharp,
  },
]

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar()
  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
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
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className='[&>svg]:size-5' >
                    <a href={item.url}>
                      <item.icon  />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
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
