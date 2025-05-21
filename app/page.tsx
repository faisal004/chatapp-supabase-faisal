"use client"
import { Clients } from "@/components/clients"
import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"


export default function Home() {
  return (
    <>
      <div className="font-manrope  flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <HeroSection />
          <Clients/>
        </main>
      </div>
    </>
  )
}

