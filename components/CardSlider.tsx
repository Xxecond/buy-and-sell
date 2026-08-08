"use client"
import Image from "next/image"
import { Button } from "./ui";
import { useState } from "react";
import { getStoredUser } from "@/lib";

function HeroSection (){
    const [showImage, setShowImage] = useState(false);
    const hey = getStoredUser();
    const firstName = hey?.email?.trim().split("@")[1] || " "
    
    function handleClick (){

    }
    return(
        <section className="h-50vh absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-red-900 w-[50%]">
            <div arial-label="img+brand name" className="flex gap-9 text-white">
        <div className="relative h-10 w-20 bg-black">
            <Image 
            src="/assets/logo.JPG"
            alt="logo-pic"
            fill
            className="object-contain" />
            </div>
            <p className="font-black text-lg">TonaTon</p>
            <div className="bg-white text-black text-center flex items-center rounded-full  h-12 w-15">{firstName}</div>
            <Button
            variant="special" onClick={(() =>setShowImage(!showImage))}>Click</Button>
            </div>
        {showImage? <div>you not authorized for this</div>:<p>fuck you</p>}
        {}
        </section>
    )
}
    
export default function Slider (){
    return(
        <div>
            <HeroSection  />
        </div>
    )

}