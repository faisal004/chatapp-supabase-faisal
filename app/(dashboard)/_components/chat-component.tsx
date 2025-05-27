"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchMessages, replyMessage, sendMessage } from "@/lib/queries/chatQueries";
import React, { useEffect, useRef, useState } from "react";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/util/supabase/client";
import { ChevronsUpDown, Divide, Paperclip, Search, Send, Smile, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import EmojiPicker from "emoji-picker-react";
import { formatWhatsAppDate } from "@/util/fucntions/formatDate";
import { useOnlineUsersStore } from "@/store/user-online-store";
import { Button } from "@/components/ui/button";
import { FaFolder, FaMicrophone } from "react-icons/fa";
import { RiTimer2Line } from "react-icons/ri";
import { RxCountdownTimer } from "react-icons/rx";
import { BsStars } from "react-icons/bs";
import Image from "next/image";

type Message = Tables<"messages">;

const ChatComponent = ({ id }: { id: string }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { onlineUsers } = useOnlineUsersStore()
    const supabase = createClient();
    const user = useCurrentUser();
    const [chatPartner, setChatPartner] = useState<{ id?: string | number, full_name?: string | null; avatar_url?: string | null } | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);

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
                .channel(`messages-${id}`)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        .select("full_name, avatar_url,id")
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
        if (replyingTo) {
            const { error } = await replyMessage(id, user.id, newMessage, replyingTo.id);
            if (!error) setNewMessage("");
            setReplyingTo(null);
            return;
        }
        const { error } = await sendMessage(id, user.id, newMessage);
        if (!error) setNewMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReply = async (message: Message) => {
        console.log(message)
        setReplyingTo(message);

    };
    function groupMessagesByDate(messages: Message[]) {
        const groups: { [date: string]: Message[] } = {};
        messages.forEach((msg) => {
            const dateObj = new Date(msg.created_at!);
            const dateKey = dateObj.toISOString().slice(0, 10);
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(msg);
        });
        return groups;
    }

    function getDateLabel(dateKey: string) {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const date = new Date(dateKey);

        const isToday = today.toISOString().slice(0, 10) === dateKey;
        const isYesterday = yesterday.toISOString().slice(0, 10) === dateKey;
        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";
        return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
    }

    const groupedMessages = groupMessagesByDate(messages);
    const sortedDateKeys = Object.keys(groupedMessages).sort();

    return (
        <div className="w-full bg-[url('/chatbg.jpg')] bg-no-repeat bg-cover h-full relative ">
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
                    <div className="flex flex-col items-center  ">
                        <span>{chatPartner?.full_name}</span>
                        {onlineUsers.includes(chatPartner.id as number) && (
                            <div className="flex items-center  justify-start w-full text-xs gap-1">
                                Online
                                <span className="size-2 bg-green-500 rounded-full"></span>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <Search className="size-6" />
                </div>
            </div>}

            {id ? (
                <div className="w-full pt-12 px-4 z-50">
                    <div
                        ref={chatContainerRef}
                        className="w-full flex flex-col gap-2 overflow-y-auto z-50 pt-2 pb-20 md:pb-2 h-[calc(100vh-7rem)] md:h-[calc(100vh-11rem)]"
                        id="chatcontainer"
                    >
                        {sortedDateKeys.map((dateKey) => (
                            <React.Fragment key={dateKey}>
                                <div className="flex justify-center my-2">
                                    <span className="bg-gray-300 text-black font-semibold text-xs px-3 py-1 rounded-full ">
                                        {getDateLabel(dateKey)}
                                    </span>
                                </div>
                                {groupedMessages[dateKey].map((message) => {
                                    const isCurrentUser = message.sender_id === user?.id;
                                    // Find the replied-to message if reply_to_id exists
                                    const repliedMessage = message.reply_to_id
                                        ? Object.values(groupedMessages)
                                            .flat()
                                            .find((msg) => msg.id === message.reply_to_id)
                                        : null;

                                    return (
                                        <div key={message.id} className={`flex z-50 ${isCurrentUser ? "justify-end" : "justify-start"}`} onDoubleClick={() => handleReply(message)}>
                                            <div className="flex gap-1">
                                                {isCurrentUser ? "" : (
                                                    <Avatar className="size-6">
                                                        <AvatarImage src={chatPartner?.avatar_url as string} />
                                                        <AvatarFallback>FB</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <Card
                                                    className={`p-2 rounded-lg min-w-40 max-w-xs break-words ${isCurrentUser ? "bg-emerald-100 text-black self-end" : "bg-white text-black self-start"}`}
                                                >
                                                    <div className="flex flex-col pl-1">
                                                        {/* Show replied-to message if exists */}
                                                        {repliedMessage && (
                                                            <div className="mb-2 p-2 rounded bg-gray-100 text-xs text-gray-700 border-l-4 border-emerald-400">
                                                                <span className="font-semibold">
                                                                    {repliedMessage.sender_id === user?.id ? "You" : chatPartner?.full_name || "User"}:
                                                                </span>
                                                                <span className="ml-1">{repliedMessage.content}</span>
                                                            </div>
                                                        )}
                                                        <div className="text-xs font-medium text-emerald-700 mb-1">
                                                            {!isCurrentUser && (<span>{chatPartner?.full_name}</span>)}
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
                            </React.Fragment>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            ) : (
                <div className="w-full flex items-center justify-center text-gray-600 cursor-pointer h-[calc(100vh-1rem)] md:h-[calc(100vh-12rem)]">
                    Click on user profile to start chat
                </div>
            )}

            {id && (
                <div className="bg-white  border-t border-gray-200 z-50 absolute bottom-0 w-full">
                    {replyingTo && <div className="flex items-center justify-between p-3 bg-emerald-100 border-l-4  border-green-700">
                    <div className="flex flex-col">
                    <span className="font-semibold">
                            {replyingTo.sender_id === user?.id ? "You" : chatPartner?.full_name || "User"}:
                        </span>
                        <div>
                        {replyingTo.content}

                        </div>
                    </div>
           

                        <button onClick={() => setReplyingTo(null)} className="size-4 bg-white flex items-center justify-center">
                            <X className="size-3" />
                        </button>
                    </div>}
                    <div className="flex items-center bg-white  p-1">

                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message"
                            className="flex-1 py-2 px-3 outline-none resize-none max-h-20"
                            rows={1}
                        />


                        <Button
                            onClick={handleSendMessage}
                            className="p-2  text-white rounded-full rotate-45 "
                            variant={"ghost"}
                        >
                            <Send className="text-green-500 size-6" fill="green" />
                        </Button>

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <Paperclip size={16} />
                            </button>

                            <button
                                className="p-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile size={16} />
                            </button>

                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <RiTimer2Line />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <RxCountdownTimer />

                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <BsStars />

                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <FaFolder />

                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <FaMicrophone />
                            </button>
                        </div>
                        <div>
                            <Button
                                variant={"outline"}

                                className="hidden md:flex items-center gap-3 h-7 "
                            >
                                <Image src="/logo1.png" alt="periskope" width={16} height={16} className="rounded-full" />      <span> Periskope </span> <ChevronsUpDown />
                            </Button>

                        </div>
                    </div>



                    {showEmojiPicker && (
                        <div className="absolute bottom-10 left-4 z-[9999]">
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