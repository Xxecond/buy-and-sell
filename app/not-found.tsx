"use client"

import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound(){
    return(
        <div className="font-semibold h-dvh w-screen bg-green-900 flex flex-col space-y-9 text-white justify-center items-center">
            <p>oops! Page you looking for doesn&apos;t exist</p>
        <Button 
        variant="special">
        <Link href= "/">Return Home</Link>
        </Button>
        </div>
    )
}