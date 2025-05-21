import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-66px)] w-full flex flex-col items-center justify-center bg-[#041200] text-white">
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold md:text-center mb-4 md:leading-24 text-left  text-balance">
        Manage <span className="text-[#22c55e]">WhatsApp Groups</span><br />
        <span className="text-[#22c55e]">and Chats</span> at scale
      </h1>
      <p className="text-sm md:text-xl text-gray-100 mt-2 mb-8 max-w-xl text-center">
        Connect multiple numbers, create tasks & tickets, integrate with your systems, and automate your workflows on WhatsApp
      </p>
      <div className="flex gap-4 mb-8">
        <Button className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white px-8 py-3 text-lg rounded-lg shadow-lg">
          Sign Up for Free
        </Button>
        <Button variant="outline" className="px-8 py-3 text-lg rounded-lg border-gray-400 text-white">
          Book a Demo
        </Button>
      </div>
      <p className="text-xs text-gray-100 mb-8">
        Connect any WhatsApp Number. No WhatsApp Business API Required.
      </p>
    </div>

 
  </div>
  );
}
