"use client";
import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Tables } from "@/lib/database.types";
import Navbar from "../_components/navbar";
import ChatComponent from "../_components/chat-component";
import UsersSidebar from "../_components/users-sidebar";
import {
  Drawer,
  DrawerContent,

  DrawerTitle,
} from "@/components/ui/drawer"
import { useOpenStore } from "@/store/new-chat";


type Profile = Tables<"profiles">;
const Dashboard = () => {
  const user = useCurrentUser();
  const [users, setUsers] = useState<Profile[]>([]);
  const [chatId, setChatId] = useState("")
  const { open, setOpen } = useOpenStore();
  const supabase = createClient();

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);
  const startChat = async (receiverId: string) => {
    try {
      const { data: existingChat, error: fetchError } = await supabase
        .from("chats")
        .select("id")
        .or(
          `and(user1.eq.${user.id},user2.eq.${receiverId}),and(user1.eq.${receiverId},user2.eq.${user.id})`
        )
        .single();

      let chatId = existingChat?.id;

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching chat:", fetchError);
        return;
      }

      if (!chatId) {
        const { data, error: insertError } = await supabase
          .from("chats")
          .insert([{ user1: user.id, user2: receiverId }])
          .select("id")
          .single();

        if (insertError) {
          console.error("Error creating chat:", insertError);
          return;
        }

        chatId = data?.id;
      }

      if (chatId) {
        setChatId(chatId)
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", user?.id);

    if (error) console.error(error);
    else setUsers(data);
  };

  return (

    <>
      <Drawer open={open} onOpenChange={setOpen}>

        <DrawerContent>
          <DrawerTitle className="flex items-center justify-center text-3xl pt-2">
            Chats
          </DrawerTitle>
          <Suspense fallback={<div>Loading...</div>}>
            <UsersSidebar users={users} startChat={startChat} />

          </Suspense>
        </DrawerContent>
      </Drawer>

      <div className="w-full  ">
        <Navbar />
        <div className="flex w-full border ">
          <div className="  w-[30%] md:flex hidden ">
            <Suspense fallback={<div>Loading...</div>}>
              <UsersSidebar users={users} startChat={startChat} />

            </Suspense>


          </div>

          <div className="w-[70%]  ">

            <ChatComponent id={chatId} />

          </div>
        </div>


      </div>

    </>


  );
};

export default Dashboard;
