"use client"

import { LoginForm } from "@/components/auth"


export default function loginPage(){

    return(
        <div className="bg-green-900 h-screen flex items-center justify-center  ">
            <main className="flex relative rounded-4xl overflow-hidden h-full max-h-4/6 max-w-5/6 w-full   bg-yellow-600">
                <section className="w-1/2 hidden lg:block bg-black" ></section>
                <section className="lg:w-1/2 w-full bg-white flex justify-center items-center"><LoginForm
                 className="text-black  w-5/6" /></section>
            </main>
        </div>
    )
}