"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { signout } from "../lib/auth-actions";
import { createClient } from "@/util/supabase/client";


const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
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
