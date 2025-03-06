"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchMessages, sendMessage } from "@/lib/queries/chatQueries";
import React, { useEffect, useState } from "react";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/util/supabase/client";
import { Mic, Paperclip, Send } from "lucide-react";

type Message = Tables<"messages">;


const ChatComponent = ({ id }: { id: string }) => {
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
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    return (
        <div className="w-full bg-[url('/chatbg.jpg')] bg-no-repeat bg-cover h-full relative">
        <div className="absolute inset-0 bg-gray-200/40"></div>
    
        {id ? (
            <div className="w-full">
                <div className="w-full">
                    {messages.map((message) => (
                        <div key={message.id}>{message.content}</div>
                    ))}
                </div>
            </div>
        ) : (
            <div
                className="w-full h-full flex items-center justify-center text-gray-600 cursor-pointer"
              
            >
                Click on user profile to start chat
            </div>
        )}
    
        {id && (
            <div className="bg-gray-50 p-3 border-t border-gray-200 z-10 absolute bottom-0 w-full">
                <div className="flex items-center bg-white rounded-full p-1">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                        <Paperclip size={20} />
                    </button>
    
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message"
                        className="flex-1 py-2 px-3 outline-none resize-none max-h-20"
                        rows={1}
                    />
    
                    {newMessage.trim() === "" ? (
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                            <Mic size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSendMessage}
                            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                        >
                            <Send size={20} />
                        </button>
                    )}
                </div>
            </div>
        )}
    </div>
    
    );
};

export default ChatComponent;
