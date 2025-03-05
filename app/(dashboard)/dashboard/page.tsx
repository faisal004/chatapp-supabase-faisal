"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/util/supabase/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Tables } from "@/lib/database.types";

type Profile = Tables<"profiles">;
const Dashboard = () => {
  const user = useCurrentUser();
  const [users, setUsers] = useState<Profile[]>([]);

  const supabase = createClient();

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", user?.id);

    if (error) console.error(error);
    else setUsers(data);
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.full_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
