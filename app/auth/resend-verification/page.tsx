"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeftSquareIcon } from "lucide-react";
import ResendForm from "@/components/auth/ResendForm";

export default function ResendVerificationPage() {
  return (
    <div className="bg-emerald-600 h-dvh flex items-center justify-center p-4">
      <main className="flex relative rounded-lg overflow-hidden h-[86dvh] max-h-[100%] min-w-5/6 w-full  bg-yellow-900">
        <section className="relative w-1/2 hidden lg:block">
          <Image
            alt="bnc-pic"
            src="/assets/bncPic.JPG"
            fill
            loading="eager"
            className="object-fill"
          />
        </section>
        <section className=" overflow-auto lg:w-1/2 w-full bg-white flex flex-col justify-center items-center">
          <header className=" flex items-center justify-center w-full relative min-h-[40px]">
          <Link href="/auth/signup">
            <ArrowLeftSquareIcon className="absolute left-1 top-2 w-6 h-6 md:w-8 md:h-8 " />
          </Link>
          <h1 className="font-bold text-lg md:text-xl ">
          RESEND EMAIL VERIFICATION
          </h1>
          </header>
          <div className="w-full mx-auto flex flex-col items-center space-y-4 pt-2  ">
            <ResendForm />
          </div>
        </section>
      </main>
    </div>
  );
}
