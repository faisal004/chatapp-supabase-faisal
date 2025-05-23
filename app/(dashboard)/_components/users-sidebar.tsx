import { useState } from "react";
import { Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOpenStore } from "@/store/new-chat";
import {  Phone } from "lucide-react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

type Profile = Tables<"profiles">;

interface SidebarProps {
  users: Profile[];
  startChat: (receiverId: string) => void;
}

const UsersSidebar = ({ users, startChat }: SidebarProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { setOpen } = useOpenStore();
  // const { onlineUsers } = useOnlineUsersStore()
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    startChat(userId);
    setOpen(false)
  };
console.log(users)
  return (
    <div className="h-[calc(100vh-58px)]  w-full relative ">
      <div className="absolute bottom-0 right-1 bg-[#15803d] hover:bg-[#15803d]/90 text-white rounded-full p-3 z-40 cursor-pointer ">
          <IoChatbubbleEllipsesOutline className="size-6" />
      </div>
      <ScrollArea className=" h-[calc(100vh-65px)] ">
        {users.map((u) => (
          <Card
            key={u.id}
            className={`p-3 overflow-hidden rounded-[5px] border-0 h-20  cursor-pointer relative 
              ${selectedUserId === u.id
                ? "bg-gray-100 hover:bg-gray-300"
                : "bg-white hover:bg-gray-200"
              } shadow-none`}
            onClick={() => handleUserClick(u.id)}
          >
            <div className="absolute top-2 right-5 inline-flex items-center justify-center px-2 py-[1px] text-[10px] font-bold leading-none  bg-green-100 border-[1px] border-green-400 text-green-600 rounded-[1px]">
              DEMO
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Avatar >
                  <AvatarImage src={u.avatar_url as string} />
                  <AvatarFallback>{u.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
        
              </div>

              <div className="space-y-1.5">
                <div>
                <div className="text-sm font-semibold">{u.full_name}</div>
                <div className="flex items-center">
                  <div className="text-xs line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, fugit.
                  </div>
               
                </div>
                </div>
             <div className="flex items-center justify-between">
             <div className="text-[10px] flex items-center font-extralight bg-gray-100 rounded-[5px] w-28   px-2 py-[1px] gap-1">
                  <Phone className="size-2"/>
                <span> +91 9999999999 </span> 
                </div>
                <div className="text-[10px] font-extralight">
                  Date
                </div>
             </div>
              

              </div>
            </div>
          </Card>
        ))}

      </ScrollArea>


    </div>
  );
};

export default UsersSidebar;
