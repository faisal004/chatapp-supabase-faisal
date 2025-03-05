import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-actions";
import {  MessagesSquare } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between container mx-auto p-2 h-14">
            <div className="flex items-center justify-center  gap-1.5">
                <div className="flex items-center justify-center">
                <MessagesSquare className="size-5"/>
                </div>
         <div> Chats </div>
            </div>
            <Button
            variant={"ghost"}
                onClick={() => {
                    signout();
                }}
            >
                Log out
            </Button>
        </nav>
    );
}

export default Navbar;