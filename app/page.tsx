"use client"
import { Clients } from "@/components/clients"
import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { createClient } from "@/util/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";


export default function Home() {
      const [user, setUser] = useState<User | null>(null);
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
  return (
    <>
      <div className="font-manrope  flex flex-col">
        <Navbar user={user}/>
        <main className="flex-grow pt-16">
          <HeroSection user={user} />
          <Clients/>
        </main>
      </div>
    </>
  )
}

