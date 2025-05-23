
import { createClient } from "@/util/supabase/client";

const supabase = createClient();

export const addTag = async (from: string, to: string, tag: string) => {
    const { data, error } = await supabase
        .from('user_tags')
        .insert({ from_user_id: from, to_user_id: to, tag });

    return { data, error };
};

export const getTags = async (userId: string, currentUserId: string) => {
    const { data, error } = await supabase
        .from("user_tags")
        .select("*")
        .eq("to_user_id", userId)
        .eq("from_user_id", currentUserId);

    return { data, error };
};

export const removeTag = async (from: string, to: string, tag: string) => {
    const { error } = await supabase
        .from('user_tags')
        .delete()
        .eq('from_user_id', from)
        .eq('to_user_id', to)
        .eq('tag', tag);
    return { error };
};