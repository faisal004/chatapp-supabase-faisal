import { Button } from "@/components/ui/button";
import { ChevronsUpDown, HelpCircleIcon, MessageCircle, MonitorDown, } from "lucide-react";
import { FaBolt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { LuRefreshCcwDot } from "react-icons/lu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMiniBellSlash } from "react-icons/hi2";
import { MdFormatListBulleted } from "react-icons/md";


const Navbar = () => {

    return (
        <nav className="flex items-center justify-between  mx-auto p-2 h-12">
            <div className="flex items-center justify-center  space-x-2 text-gray-500 ">
                <IoChatbubbleEllipsesSharp size={15} />
                <div className="font-semibold text-md"> chats </div>
            </div>
            <div className="flex items-center gap-2 ">
                <Button
                    variant={"outline"}

                    className="bg-[#15803d] hover:bg-[#15803d]/90 text-white font-medium rounded-md "
                >
                    <FaBolt />
                    <span>Upgrade Brand</span>
                </Button>
                <Button
                    variant={"outline"}

                    className="hidden md:flex"
                >
                    <LuRefreshCcwDot />
                    <span>Refresh </span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"outline"}

                            className="hidden md:flex"
                        >
                            <HelpCircleIcon />    <span>Help </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[220px]">
                        <DropdownMenuItem className="gap-2">
                            <span className="text-green-600"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e" /><path d="M8.5 12.5l2 2 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            System status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" fill="none" /><path d="M8 12h8M12 8v8" stroke="#222" strokeWidth="2" strokeLinecap="round" /></svg></span>
                            Reload app
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 bg-muted" style={{ backgroundColor: '#f5f6fa' }}>
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4.93 4.93a10 10 0 1 1 0 14.14M2 12h1M12 2v1" stroke="#222" strokeWidth="2" strokeLinecap="round" /></svg></span>
                            Refresh data
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="#222" strokeWidth="2" /><path d="M8 8h8v8H8z" stroke="#222" strokeWidth="2" /></svg></span>
                            Documentation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#222" strokeWidth="2" /><path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#222" strokeWidth="2" /></svg></span>
                            Watch Tutorial
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" /><path d="M12 16v.01M12 8v4" stroke="#222" strokeWidth="2" strokeLinecap="round" /></svg></span>
                            Contact us
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#222" strokeWidth="2" /></svg></span>
                            Feature Request
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" stroke="#222" strokeWidth="2" /></svg></span>
                            Best Practices
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="7" rx="2" stroke="#222" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#222" strokeWidth="2" /></svg></span>
                            Book a demo
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" stroke="#222" strokeWidth="2" /></svg></span>
                            Chats not loading?
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#222" strokeWidth="2" /><path d="M4 9h16" stroke="#222" strokeWidth="2" /></svg></span>
                            Refresh team access
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <span className="text-gray-700"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 0v4m0 12v4m8-8h-4M4 12H0" stroke="#222" strokeWidth="2" /></svg></span>
                            App slow?
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant={"outline"}

                    className="hidden md:flex items-center gap-3 "
                >
                    <div className="relative pl-1 animate-pulse">
                        <div className="absolute top-0 right-0 inline-flex items-center justify-center  text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full size-3 ring-2 ring-offset-2" ></div>
                    </div>   <span> 0/1  phones </span> <ChevronsUpDown />
                </Button>
                <Button
                    variant={"outline"}

                    className="hidden md:flex"
                >
                  <MonitorDown />  
                </Button>
                <Button
                    variant={"outline"}

                    className="hidden md:flex"
                >
                  <HiMiniBellSlash /> 
                </Button>
                <Button
                    variant={"outline"}

                    className="hidden md:flex"
                >
                 <MdFormatListBulleted />
                </Button>
                <Button
                    variant={"outline"}

                    className="md:hidden flex "
                >
                    <MessageCircle />    <span>New Chat </span>
                </Button>
                {/* <Button
                variant={"outline"}
                onClick={() => {
                    signout();
                }}
            >
                Log out
            </Button> */}

            </div>

        </nav>
    );
}

export default Navbar;