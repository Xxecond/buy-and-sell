"use client"

import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col space-y-20 items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <p>BUY AND SELL</p>
        <div className="relative w-1/2 h-[30vh] ">
        <Image 
        alt="layout icon"
        src="/assets/logo.JPG"
        fill
        loading="eager"
        className="object-fill " />
        </div>
        <div className=" w-full grid space-y-3">
          <Link href="/auth/login"><Button
          variant="outline" 
          className="w-full">Log in</Button></Link>
          
          <a href="/auth/login"><Button
          variant="special"
          className="w-full">signup</Button></a>
        </div>
      </main>
    </div>
  );
}
