import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Supabase",
  description: "Chat Supabase",
  openGraph: {
    title: "Chat Supabase",
    description: "Chat Supabase",
    url: 'https://chatapp-supabase-faisal.vercel.app/',
    type: "website",
    images: [
      {
        url:
          'https://chatapp-supabase-faisal.vercel.app/og.png',
        width: 1200,
        height: 639,
        alt: 'Chat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chat Supabase",
    description: "Chat Supabase",
    images: [
      {
        url:
          'https://chatapp-supabase-faisal.vercel.app/og.png',
        width: 1200,
        height: 639,
        alt: 'Chat',
      },
    ],
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
