"use client";
import { useEffect } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useOnlineUsersStore } from "@/store/user-online-store";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayoutWithPresence = ({ children }: AppLayoutProps) => {
  const user = useCurrentUser();
  const { initializePresence, cleanupPresence } = useOnlineUsersStore();

  useEffect(() => {
    if (user?.id) {
      initializePresence(user.id);
      
      return () => {
        cleanupPresence();
      };
    }
  }, [user?.id, initializePresence, cleanupPresence]);

  return <>{children}</>;
};

export default AppLayoutWithPresence;