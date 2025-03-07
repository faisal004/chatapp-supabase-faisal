import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signout } from "@/lib/auth-actions";

const Profile = () => {
    const user = useCurrentUser();

    if (!user) {
        return null;
    }

    const { name, email, avatar_url } = user.user_metadata;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={avatar_url} />
                    <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "?"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-gray-500">{email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button className="w-full" variant={"outline"}  onClick={() => {
                    signout();
                }}>
                        Logout
                    </Button>
                </DropdownMenuItem>
             
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Profile;
