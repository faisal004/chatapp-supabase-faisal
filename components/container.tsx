"use client";



import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
};

export const Container = ({
    children,
}: ContainerProps) => {



    return (
        <div className={cn(
            "flex-1 overflow-hidden transition-all duration-200 ease-in-out ml-[60px] ",

        )}>
            {children}
        </div>
    );
};