
import { createClient } from "@/util/supabase/client";

const supabase = createClient();

export const checkChatAccess = async (chatId: string, userId: string) => {
    const { data: chat, error } = await supabase
        .from("chats")
        .select("*")
        .eq("id", chatId)
        .or(`user1.eq.${userId},user2.eq.${userId}`)
        .single();

    return { chat, error };
};

export const fetchMessages = async (chatId: string) => {
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

    return { messages: data || [], error };
};

export const sendMessage = async (chatId: string, userId: string, content: string) => {
    const { error } = await supabase.from("messages").insert([
        {
            chat_id: chatId,
            sender_id: userId,
            content,
        },
    ]);

    return { error };
};


export const replyMessage = async (chatId: string, userId: string, content: string,originalMessageId:string) => {
    const { data, error } = await supabase
    .from('messages')
    .insert([{
      chat_id: chatId,
      content: content,
      sender_id: userId,
      reply_to_id: originalMessageId  // <-- this links the reply
    }]);

    return { error };
};