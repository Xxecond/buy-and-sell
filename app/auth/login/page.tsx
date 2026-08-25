"use client";

import { LoginForm } from "@/components/auth";
import { ArrowLeftSquareIcon } from "lucide-react";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
import Image from "next/image";

export default function loginPage() {
  return (
    <div className="bg-emerald-600 h-dvh flex items-center justify-center p-4">
      <main className="flex relative rounded-lg overflow-hidden h-[86dvh] max-h-[100%] min-w-5/6 w-full  bg-yellow-900">
        <section className="relative w-1/2 hidden lg:block">
          <Image
            alt="bnc-pic"
            src="/assets/bncPic.JPG"
            fill
            loading="eager"
            className="object-cover"
          />
        </section>
        <section className=" overflow-auto lg:w-1/2 w-full bg-white flex flex-col justify-center items-center">
          <header className=" flex items-center justify-center w-full relative min-h-[40px]">
            <Link href="/">
            <ArrowLeftSquareIcon className="absolute left-1 top-2 w-6 h-6 md:w-8 md:h-8 " />
          </Link>
          <h1 className=" font-bold text-lg md:text-xl">
            GOOD TO SEE YOU AGAIN
          </h1>
          </header>
          <div className="flex flex-col mx-auto w-full items-center space-y-4 pt-2">
            <LoginForm className="text-black" />
          </div>
          <div className="px-10 pt-2  flex flex-col space-y-6 items-center w-xl max-w-full">
            <div className="flex items-center w-full ">
              <p className="flex-1 bg-emerald-600 h-[2px]"></p>
              <p className=" px-4  whitespace-nowrap text-xs md:text-sm">
                OR LOGIN WITH
              </p>
              <p className="flex-1 bg-emerald-600 h-[2px] "></p>
            </div>
            <nav className=" w-full py-2 flex items-center justify-evenly ">
              <a href="">
                  <div
                    arial-label="gg-section"
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="w-15 h-10 md:w-18 md:h-12 bg-white border border-gray-400 text-white rounded-lg flex justify-center items-center">
                      <FcGoogle className="w-6 h-6 md:w-8 md:h-8 " />
                    </div>
                    <p className="text-sm md:base">GOOGLE</p>
                  </div>
                </a>
              <a href="">
                <div
                  aria-label="X-section"
                  className="flex flex-col items-center justify-center"
                >
                  <div className=" w-15 h-10 md:w-20 md:h-12  bg-black text-white  rounded-lg flex justify-center items-center">
                    <FaXTwitter className="w-6 h-6 md:w-8 md:h-8 " />
                  </div>
                  <p className="text-sm md:text-base">X</p>
                </div>
              </a>
              <a href="">
                <div
                  aria-label="fb-section"
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-15 h-10 md:w-18 md:h-12  bg-blue-600 text-white rounded-lg flex justify-center items-center">
                    <FaFacebook className="w-6 h-6 md:w-8 md:h-8 " />
                  </div>
                  <p className="text-sm md:text-base">FACEBOOK</p>
                </div>
              </a>
            </nav>
          </div>
        </section>
      </main>
    </div>
  );
}
