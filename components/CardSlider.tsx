"use client"
import Image from "next/image"
import { Button } from "./ui";
import { useState } from "react";
import {  } from "@/lib/auth";
import { useAuth } from "@/contexts/authContext";

function HeroSection (){ const [showImage, setShowImage] = useState(false);

  const { user, loading } = useAuth();

  const firstName = user?.name?.trim().split(" ")[0] || "";

  function handleClick() {
    setShowImage((prev) => !prev);
  }

  return (
    <section className="h-[50vh] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-red-900 w-[50%]">
      <div
        aria-label="img and brand name"
        className="flex items-center gap-9 text-white"
      >
        {/* Logo */}
        <div className="relative h-10 w-20 bg-black">
          <Image
            src="/assets/logo.JPG"
            alt="TonaTon logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Brand name */}
        <p className="font-black text-lg">TonaTon</p>

        {/* User */}
        <div className="bg-white text-black text-center flex items-center justify-center rounded-full h-12 w-20">
          {loading ? "..." : firstName || "Guest"}
        </div>

        {/* Button */}
        <Button variant="special" onClick={handleClick}>
          Click
        </Button>
      </div>

      {/* Content */}
      {showImage ? (
        <div>you not authorized for this</div>
      ) : (
        <p>fuck you</p>
      )}
    </section>
  );
}
    
export default function Slider (){
    return(
        <div>
            <HeroSection  />
        </div>
    )

}