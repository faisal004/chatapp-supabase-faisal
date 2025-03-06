"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchMessages, sendMessage } from "@/lib/queries/chatQueries";
import React, { useEffect, useRef, useState } from "react";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/util/supabase/client";
import { Mic, Paperclip, Search, Send, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import EmojiPicker from "emoji-picker-react";
import { formatWhatsAppDate } from "@/util/fucntions/formatDate";

type Message = Tables<"messages">;

const ChatComponent = ({ id }: { id: string }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const supabase = createClient();
    const user = useCurrentUser();
    const [chatPartner, setChatPartner] = useState<{ full_name?: string | null; avatar_url?: string | null } | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (user && id) {
            loadMessages();
            fetchChatPartner();
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
    
    const fetchChatPartner = async () => {
        try {
            const { data: chatData, error: chatError } = await supabase
                .from("chats")
                .select("user1, user2")
                .eq("id", id)
                .single();

            if (chatData && !chatError) {
                // Determine which user is the chat partner
                const partnerId = chatData.user1 === user.id ? chatData.user2 : chatData.user1;

                if (partnerId) {
                    const { data: partnerData } = await supabase
                        .from("profiles")
                        .select("full_name, avatar_url")
                        .eq("id", partnerId)
                        .single();

                    setChatPartner(partnerData);
                }
            }
        } catch (error) {
            console.error("Error fetching chat partner:", error);
        }
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
            <div className="absolute inset-0 z-10" style={{
                backgroundImage: "linear-gradient(rgba(229,221,213,0.5), rgba(229,221,213,0.5))",
                backgroundSize: "cover"
            }}></div>

            {id && chatPartner && <div className="bg-white flex items-center justify-between shadow-xs border-b border-b-gray-400 z-50 absolute top-0 w-full h-12 pl-2 pr-4">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={chatPartner?.avatar_url as string} />
                        <AvatarFallback>FB</AvatarFallback>
                    </Avatar>         
                    <span>{chatPartner?.full_name}</span>
                </div>
                <div>
                    <Search className="size-6" />
                </div>
            </div>}
            
            {id ? (
                <div className="w-full pt-12 px-4 z-50">
                    <div 
                        ref={chatContainerRef} 
                        className="w-full flex flex-col gap-2 overflow-y-auto z-50 py-2" 
                        id="chatcontainer" 
                        style={{ height: "calc(100vh - 12rem)" }}
                    >
                        {messages.map((message) => {
                            const isCurrentUser = message.sender_id === user?.id;
                            return (
                                <div key={message.id} className={`flex z-50 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                    <div className="flex gap-1">
                                        {isCurrentUser ? "" : <Avatar className="size-6">
                                            <AvatarImage src={chatPartner?.avatar_url as string} />
                                            <AvatarFallback>FB</AvatarFallback>
                                        </Avatar>}
                                        <Card
                                            className={`p-2 rounded-lg min-w-32 max-w-xs break-words ${
                                                isCurrentUser ? "bg-emerald-100 text-black self-end" : "bg-white text-black self-start"
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <div className="text-xs font-medium text-emerald-700 mb-1">
                                                    {isCurrentUser ? "You" : (<span>{chatPartner?.full_name}</span>)}
                                                </div>
                                                {message.content}
                                                <div className="text-right text-[10px] text-gray-500 mt-1">
                                                    {formatWhatsAppDate(message.created_at as string)}
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 cursor-pointer">
                    Click on user profile to start chat
                </div>
            )}

            {id && (
                <div className="bg-gray-50 p-3 border-t border-gray-200 z-50 absolute bottom-0 w-full">
                    <div className="flex items-center bg-white rounded-full p-1">
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                            <Paperclip size={20} />
                        </button>

                        <button
                            className="p-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <Smile size={20} />
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

                    {showEmojiPicker && (
                        <div className="absolute bottom-16 left-4 z-[9999]">
                            <EmojiPicker
                                onEmojiClick={(emojiObject) => {
                                    setNewMessage(prev => prev + emojiObject.emoji);
                                    setShowEmojiPicker(false);
                                }}
                                searchDisabled={true}
                                skinTonesDisabled={true}
                                width={300}
                                height={350}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatComponent;