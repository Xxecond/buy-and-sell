"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "Help", href: "/help" },
];

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div arial-label="nav-menu" className="relative overflow-hidden w-50 bg-white h-full shadow-xl flex flex-col p-6 gap-2">
            <div arial-label="top-items" className="absolute top-5 w-full  flex items-center justify-evenly gap-2 -mx-6 ">
              <span className="bg-white ml-1 flex justify-between font-bold text-xl text-emerald-600  w-[50%]">
                <div className="relative h-10 w-10">
                  <Image
                alt="bnc-logo"
                src="/assets/logo.JPG"
                fill 
                className="object-fill" /> 
                </div>
                <p className="pt-1">Shoply</p>
                </span>
              <button onClick={onClose}><X size={24} className="text-gray-700" /></button>
            </div>
            <div aria-label="link-box" className=" flex flex-col absolute top-23 w-full" >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="py-3 border-b border-gray-100 text-gray-700 font-medium hover:text-emerald-600 transition"
              >
                {link.label}
              </Link>
            ))}
            </div>
            <div aria-label="log/sign-box" className="absolute w-[90%] -translate-x-1/2 left-1/2 bottom-20 flex flex-col gap-3">

              <Link href="/auth/login" >
              <Button onClick={onClose}
              variant="outline">
                Login
                </Button>
              </Link>
              <Link href="/auth/signup" onClick={onClose}>
                <Button onClick={onClose}
                variant="special">
                  Sign Up
                  </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 bg-black/40" onClick={onClose} />
        </div>
      )}
    </>
  );
}
