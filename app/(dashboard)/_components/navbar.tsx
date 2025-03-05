import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-actions";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between container mx-auto p-2">
            <div>
                Chats
            </div>
            <Button
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