"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Tables } from "@/lib/database.types";
import Navbar from "../_components/navbar";
import ChatComponent from "../_components/chat-component";
import UsersSidebar from "../_components/users-sidebar";


type Profile = Tables<"profiles">;
const Dashboard = () => {
  const user = useCurrentUser();
  const [users, setUsers] = useState<Profile[]>([]);
  const [chatId, setChatId] = useState("")

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
    <div className=" container mx-auto">
      <Navbar />
      <div className="flex w-full border">
        <div className=" w-1/3 ">
          <UsersSidebar users={users} startChat={startChat} />

        </div>

        <div className="w-full  ">

          <ChatComponent id={chatId} />
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
