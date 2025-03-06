"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { createClient } from "@/util/supabase/client";

interface User {
  user_metadata: {
      full_name?: string;
  };
}
const LoginButton = () => {
    const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (user) {
    redirect("/dashboard")
    // return (
    //   <Button
    //     onClick={() => {
    //       signout();
    //       setUser(null);
    //     }}
    //   >
    //     Log out
    //   </Button>
    // );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
