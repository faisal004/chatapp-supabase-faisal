import { Button } from "@/components/ui/button";
// import { signout } from "@/lib/auth-actions";
import { useOpenStore } from "@/store/new-chat";
import { HelpCircleIcon, MessageCircle, MessagesSquare } from "lucide-react";
import Profile from "./profile";

const Navbar = () => {
      const { setOpen } = useOpenStore();
    
    return (
        <nav className="flex items-center justify-between container mx-auto p-2 h-14">
            <div className="flex items-center justify-center  gap-1.5">
                <div className="flex items-center  justify-center">
                    <MessagesSquare className="size-6" />
                </div>
                <div className="font-semibold text-xl"> chats </div>
            </div>
            <div className="flex items-center gap-2 ">
            <Profile/>
            <Button
                variant={"outline"}
              
                className="hidden md:flex"
            >
            <HelpCircleIcon/>    <span>Help </span>
            </Button>
            
            <Button
                variant={"outline"}
                onClick={()=>{
                    setOpen(true)
                }}
                className="md:hidden flex"
            >
            <MessageCircle/>    <span>New Chat </span>
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