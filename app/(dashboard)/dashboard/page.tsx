"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Tables } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


type Profile = Tables<"profiles">;
const Dashboard = () => {
  const user = useCurrentUser();
  const router = useRouter()
  const [users, setUsers] = useState<Profile[]>([]);

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
        router.push(`/dashboard/c/${chatId}`); 
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
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.full_name}
            <Button onClick={() => startChat(u.id)}>Chat</Button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
