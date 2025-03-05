import { Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card";

type Profile = Tables<"profiles">;

interface SidebarProps {
    users: Profile[];
    startChat: (receiverId: string) => void;
}

const UsersSidebar = ({ users, startChat }: SidebarProps) => {
    return (
        <div className=" min-h-[calc(100vh-58px)] bg-gray-50   ">
            <ul>
                {users && users.map((u) => (
                    <Card key={u.id} className="p-3 overflow-hidden rounded-none border-t-0" onClick={() => startChat(u.id)}>
                        <div className="flex gap-3">
                            <Avatar>
                                <AvatarImage src={u.avatar_url as string} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-sm font-semibold">
                                    {u.full_name}
                                </div><div className="text-xs line-clamp-1">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, fugit.
                                </div>
                            </div>

                        </div>



                    </Card>
                ))}
            </ul>

        </div>
    );
};

export default UsersSidebar
