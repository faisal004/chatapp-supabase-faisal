"use client"
import useCurrentUser from "@/hooks/useCurrentUser";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/util/supabase/client";
import React, { useEffect, useState } from "react";


type Message = Tables<"messages">;


const ChatPage = (props: { params: Promise<{ id: string }> }) => {
    const params = React.use(props.params);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const supabase = createClient();
    const user = useCurrentUser();

    useEffect(() => {
        if (params.id) {
            fetchMessages();

            const channel = supabase
                .channel('messages')
                .on(
                    'postgres_changes', 
                    { 
                        event: 'INSERT', 
                        schema: 'public', 
                        table: 'messages',
                        filter: `chat_id=eq.${params.id}`
                    },
                    (payload) => {
                        setMessages((prev) => [...prev, payload.new as Message]);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [params.id, supabase]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", params.id)
            .order("created_at", { ascending: true });

        if (error) console.error(error);
        else setMessages(data || []);
    };

    const sendMessage = async () => {
        if (newMessage.trim() === "" || !user) return;

        const { error } = await supabase.from("messages").insert([
            {
                chat_id: params.id,
                sender_id: user.id,
                content: newMessage,
            },
        ]);

        if (!error) setNewMessage("");
    };

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.content}
                    </div>
                ))}
            </div>
            <input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatPage;