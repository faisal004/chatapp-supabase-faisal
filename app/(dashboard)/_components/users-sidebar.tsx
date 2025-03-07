import { useState } from "react";
import { Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOpenStore } from "@/store/new-chat";
import { CheckCheck } from "lucide-react";
import { useOnlineUsersStore } from "@/store/user-online-store";

type Profile = Tables<"profiles">;

interface SidebarProps {
  users: Profile[];
  startChat: (receiverId: string) => void;
}

const UsersSidebar = ({ users, startChat }: SidebarProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { setOpen } = useOpenStore();
  const { onlineUsers } = useOnlineUsersStore()
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    startChat(userId);
    setOpen(false)
  };

  return (
    <div className="h-[calc(100vh-58px)] bg-gray-100 ">
      <ScrollArea className=" h-[calc(100vh-65px)] ">

        {users.map((u) => (
          <Card
            key={u.id}
            className={`p-3 overflow-hidden rounded-[5px] border-0 cursor-pointer 
              ${selectedUserId === u.id
                ? "bg-transparent hover:bg-gray-300"
                : "bg-white hover:bg-gray-200"
              } shadow-none`}
            onClick={() => handleUserClick(u.id)}
          >
            <div className="flex gap-3">
              <div className="relative">
                <Avatar >
                  <AvatarImage src={u.avatar_url as string} />
                  <AvatarFallback>{u.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {onlineUsers.includes(u.id) ? (

                  <span className="size-3 absolute bottom-0 right-0 bg-green-500 rounded-full"></span>
                ) : (<span className="size-3 absolute bottom-0 right-0 bg-yellow-500 rounded-full"></span>
                )}
              </div>

              <div>
                <div className="text-sm font-semibold">{u.full_name}</div>
                <div className="flex items-center">
                  <div className="text-xs line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, fugit.
                  </div>
                  <div>
                    <CheckCheck className="size-4 text-green-800" />
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
