import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative md:h-[calc(100vh-66px)] w-full flex flex-col items-center justify-center bg-[#041200] text-white pt-5">
    <div className="flex flex-col items-center justify-center p-3 ">
        <div className='bg-[#ffffff1a] rounded-full px-4 py-1.5 mb-3 group'>
          <p className="text-xs font-semibold text-white flex items-center">Periskope Launch Week 8 Is Here! <ArrowRight className='size-3 group-hover:translate-x-1 transition-transform duration-300'/></p>
        </div>
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold md:text-center mb-4 md:leading-24 text-left  text-balance tracking-wider">
        Manage <span className="text-[#22c55e]">WhatsApp Groups</span><br />
        <span className="text-[#22c55e]">and Chats</span> at scale
      </h1>
      <p className="text-sm md:text-xl text-gray-100 mt-2 mb-8 max-w-xl  md:text-center text-left">
        Connect multiple numbers, create tasks & tickets, integrate with your systems, and automate your workflows on WhatsApp
      </p>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 mb-8 w-full ">
        <Button className="bg-[#15803d] hover:bg-[#15803d]/90 text-white font-medium rounded-md h-12 px-5 text-lg w-full md:w-auto">
          Sign Up for Free
        </Button>
        <Button variant={"outline"} className=" text-black font-medium rounded-md h-12 px-5 text-lg w-full md:w-auto">
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
