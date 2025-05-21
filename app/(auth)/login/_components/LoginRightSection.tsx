import Link from "next/link";
import React from "react";

export function LoginRightSection() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-green-900  text-center">
        Add Tasks and Reminders
      </h2>
      <p className="text-gray-700 text-center mb-6 max-w-xl">
        Create tasks and reminders on chats, messages, and tickets to track important actions and receive timely reminders.
      </p>
      <div className="w-full flex justify-center mb-6">
      <iframe width="600" height="315" src="https://www.youtube.com/embed/ylV7mvu1g4g?si=jZ7XfDQVyDl1zdik" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <Link href="https://docs.periskope.app/integrations/google-sheets" target="_blank" className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-200 transition text-sm">
        Read Docs
      </Link>
    </div>
  );
}
