"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchMessages, sendMessage } from "@/lib/queries/chatQueries";
import React, { useEffect, useState } from "react";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/util/supabase/client";

type Message = Tables<"messages">;


const ChatComponent = ({id}:{id:string}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const supabase = createClient();
    const user = useCurrentUser();


    useEffect(() => {
        if (id) {
            loadMessages();

            const channel = supabase
                .channel("messages")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "messages",
                        filter: `chat_id=eq.${id}`,
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
    }, [id]);

    const loadMessages = async () => {
        const { messages, error } = await fetchMessages(id);
        if (error) console.error(error);
        else setMessages(messages);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" || !user) return;
        const { error } = await sendMessage(id, user.id, newMessage);
        if (!error) setNewMessage("");
    };

    return (
        <div>
            {id && <div>
                <div>
                {messages.map((message) => (
                    <div key={message.id}>{message.content}</div>
                ))}
            </div>
            <div>
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" />
            <button onClick={handleSendMessage}>Send</button>
            </div>
            </div> }
          
        </div>
    );
};

export default ChatComponent;
