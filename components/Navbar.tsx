"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NavbarProps = {
    mobile?:string;
    desktop?:string;
}

export default function Navbar({mobile, desktop}: NavbarProps){
     const [open, setOpen] = useState(false) ;
     const navLinks = [
        {id: 1, text: "home", href: "/auth/signup" },
        {id: 2, text: "about", href: "/auth/login" },
        {id: 3, text: "dashboard", href: "/dashboard" }
     ]


     if(mobile === "icon"){
            return(
                <section className="relative bg-white h-screen flex justify-start p-5 items-start text-xl">

                 <button onClick={() => setOpen(!open)} className="text-red-900 z-20"><Menu /></button>

               
                <div className={`w-[35%] top-0 left-0 bg-black h-full absolute transition-transform  duration-700 ease-in-out  ${open? "-translate-x-full": "translate-x-0"}`} >
                    <nav className="flex mt-20 justify-start pl-9 ">
                        <ul className="text-white">
                            {
                                navLinks.map((item) =>
                                <li key={item.id}><Link href={item.href}>{item.text}</Link></li>)
                            }
                        </ul>
                    </nav>
                </div>
                </section>)
            }
    if(desktop === "plain"){
            return(
                    <div>
                        <nav>
                            <ul>
                                {navLinks.map((item) => 
                                <li key={item.id}><Link href={item.href}>{item.text}</Link></li>)}
                            </ul>
                        </nav>
                    </div>
                )
            }
    
    return(
    <div>       
        <main>

        </main>
    </div>)
}