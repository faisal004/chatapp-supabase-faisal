
import { createClient } from "@/util/supabase/client";
import { Tables } from "@/lib/database.types";

const supabase = createClient();
export type Tag=Tables<'tag'>;
export const addTag = async (currentUserId: string, targetUserId: string, selectedTagId: string) => {
    const { data, error } = await supabase
        .from('user_tags')
        .insert([
            {
                from_user_id: currentUserId,
                to_user_id: targetUserId,
                tag_id: selectedTagId
            }
        ]);

    return { data, error };
};

export const getTags = async (toUserId: string, fromUserId: string) => {
    const { data: userTags } = await supabase
        .from('user_tags')
        .select('*, tag(*)')
        .eq('to_user_id', toUserId)
        .eq('from_user_id', fromUserId);

    return { data: userTags };
};

export const removeTag = async (from: string, to: string, tagId: string) => {
    const { error } = await supabase
        .from('user_tags')
        .delete()
        .eq('from_user_id', from)
        .eq('to_user_id', to)
        .eq('tag_id', tagId);
    return { error };
};

export const getAlTags = async () => {
    const { data , error } = await supabase.from('tag').select('*');
    return { data, error };
};