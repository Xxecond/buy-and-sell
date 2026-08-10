"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeftSquareIcon } from "lucide-react";
import ResendForm from "@/components/auth/ResendForm";

export default function ResendVerificationPage() {
  return (
    <div className="bg-emerald-600 h-screen flex items-center justify-center  ">
      <main className="flex relative rounded-lg overflow-hidden   h-1/2 max-w-5/6 w-full  bg-yellow-600">
        <section className="relative w-1/2 hidden lg:block">
          <Image
            alt="bnc-pic"
            src="/assets/bncPic.JPG"
            fill
            loading="eager"
            className="object-fill"
          />
        </section>
        <section className="relative lg:w-1/2 w-full bg-white flex justify-center items-center">
          <Link href="/auth/signup">
            <ArrowLeftSquareIcon className="absolute left-3  top-5 w-6 h-6 md:w-8 md:h-8 " />
          </Link>
          <h1 className="absolute top-5 font-bold text-base md:text-xl ">
            RESEND EMAIL VERIFICATION
          </h1>
          <div className=" absolute top-20  w-[77%] md:w-[80%] h-[37%]  max-h-1/2 flex flex-col justify-start items-center">
            <ResendForm />
          </div>
        </section>
      </main>
    </div>
  );
}
