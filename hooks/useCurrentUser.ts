"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return user;
};

export default useCurrentUser;
