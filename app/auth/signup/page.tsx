"use client"
import Link from "next/link";
import { ArrowLeftSquareIcon } from "lucide-react";
import { Facebook } from "lucide-react";
import { X } from "lucide-react";
import { Apple } from "lucide-react";

import Image from "next/image";


import { SignupForm } from "@/components/auth"


export default function signUpPage(){

    return(
        <div className="bg-emerald-600 h-screen flex items-center justify-center  ">
            <main className="flex relative rounded-lg overflow-hidden h-full max-h-5/6 max-w-5/6 w-full  bg-yellow-600">
                 <section className="relative w-1/2 hidden lg:block" >
            <Image 
            alt="bnc-pic"
            src="/assets/bncPic.JPG"
            fill
            loading="eager"
            className="object-fill" /></section>
                <section className="relative lg:w-1/2 w-full bg-white flex justify-center items-center">
                <Link href="/"><ArrowLeftSquareIcon className="absolute left-3  top-5 w-6 h-6 md:w-8 md:h-8 " /></Link>
                <h1 className="absolute top-5 font-bold text-lg md:text-xl ">SETUP YOUR ACCOUNT</h1>
                <div className=" absolute top-22 w-[85%] md:w-[95%] flex flex-col justify-center items-center"><SignupForm
                 /></div>
                  <div className=" absolute flex flex-col space-y-6 items-center  h-[3vh] bottom-25 w-[70%] md:w-[79%]">
                    <div className="flex items-center justify-end w-full ">
                    <p className="flex-2 bg-emerald-600 h-1  "></p>
                    <p className=" px-4  whitespace-nowrap text-xs md:text-sm">PLEASE DON'T JUDGE</p>
                    <p className="flex-2 bg-emerald-600 h-1 "></p>
                    </div>
                    <nav className=" w-full flex items-center justify-center h-15 space-x-10 md:space-x-12">
                    <div className="flex flex-col items-center justify-center">
                    <div className="w-15 h-10 md:w-18 md:h-12  bg-blue-600 text-white rounded-lg flex justify-center items-center"><Facebook className="w-6 h-6 md:w-8 md:h-8 " /></div>
                    <p className="text-sm md:text-base ">Facebook</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <div className=" w-15 h-10 md:w-18 md:h-12  bg-black text-white  rounded-lg flex justify-center items-center"><X className="w-6 h-6 md:w-8 md:h-8" /></div>
                    <p className="text-sm md:text-base ">X</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <div className="w-15 h-10 md:w-18 md:h-12 bg-zinc-800 text-white rounded-lg flex justify-center items-center"><Apple className="w-6 h-6 md:w-8 md:h-8"/></div>
                    <p className="text-sm md:text-base ">Apple</p>
                    </div>
                    </nav>
                 </div>
                 </section>
            </main>
        </div>
    )
}