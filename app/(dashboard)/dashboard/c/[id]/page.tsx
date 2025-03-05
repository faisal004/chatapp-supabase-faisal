"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { checkChatAccess, fetchMessages, sendMessage } from "@/lib/queries/chatQueries";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/util/supabase/client";

type Message = Tables<"messages">;


const ChatPage = (props: { params: Promise<{ id: string }> }) => {
    const params = React.use(props.params);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatAccess, setChatAccess] = useState<boolean | null>(null);
    const supabase = createClient();
    const user = useCurrentUser();

    useEffect(() => {
        const verifyChatAccess = async () => {
            if (!user) {
                redirect("/");
                return;
            }

            const { chat, error } = await checkChatAccess(params.id, user.id);
            if (error || !chat) {
                setChatAccess(false);
                redirect("/");
                return;
            }

            setChatAccess(true);
        };

        if (user) verifyChatAccess();
    }, [params.id, user]);

    useEffect(() => {
        if (chatAccess && params.id) {
            loadMessages();

            const channel = supabase
                .channel("messages")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "messages",
                        filter: `chat_id=eq.${params.id}`,
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
    }, [params.id, chatAccess]);

    const loadMessages = async () => {
        const { messages, error } = await fetchMessages(params.id);
        if (error) console.error(error);
        else setMessages(messages);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" || !user) return;
        const { error } = await sendMessage(params.id, user.id, newMessage);
        if (!error) setNewMessage("");
    };

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>{message.content}</div>
                ))}
            </div>
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
