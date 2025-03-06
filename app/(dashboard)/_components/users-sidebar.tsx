import { useState } from "react";
import { Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Profile = Tables<"profiles">;

interface SidebarProps {
  users: Profile[];
  startChat: (receiverId: string) => void;
}

const UsersSidebar = ({ users, startChat }: SidebarProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    startChat(userId);
  };

  return (
    <div className="h-[calc(100vh-58px)] bg-gray-50 p-2">
      <ScrollArea className=" h-[calc(100vh-65px)] ">
    
        {users.map((u) => (
          <Card
            key={u.id}
            className={`p-3 overflow-hidden rounded-[5px] border-0 cursor-pointer 
              ${
                selectedUserId === u.id
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-transparent hover:bg-gray-100"
              } shadow-none`}
            onClick={() => handleUserClick(u.id)}
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={u.avatar_url as string} />
                <AvatarFallback>{u.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{u.full_name}</div>
                <div className="text-xs line-clamp-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, fugit.
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
