
import { createClient } from "@/util/supabase/client";

const supabase = createClient();

export const addTag = async (from: string, to: string, tag: string) => {
    const { data, error } = await supabase
        .from('user_tags')
        .insert({ from_user_id: from, to_user_id: to, tag });

    return { data, error };
};

