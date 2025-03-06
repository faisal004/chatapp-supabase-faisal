'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage =  () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(()=> router.push("/"), 2000);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return <div className="h-screen flex items-center justify-center">You have logged out... redirecting in a sec.</div>;
};

export default LogoutPage;