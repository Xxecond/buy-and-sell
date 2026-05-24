"use client";

import { ShoppingCart, Search, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeaderProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
  cartCount?: number;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ onSearchClick, onMenuClick, cartCount = 0 }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 lg:px-12 py-3 flex items-center justify-between">
      {/* Mobile hamburger */}
      <Button onClick={onMenuClick} className="p-1 lg:hidden">
        <Menu size={24} className="text-gray-700" />
      </Button>

      {/* Logo */}
      <Link href="/" className="  flex items-center justify-evenly w-30 gap-1 font-bold text-xl text-emerald-600">
        <div className="relative h-9 w-8">
          <Image 
          alt="bnc-logo"
          src="/assets/logo.JPG"
          fill
          className ="object-contain"/>
          </div><p className="flex-1">Shoply</p>
      </Link>

      {/* Desktop nav links */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition hover:text-emerald-600 ${pathname === link.href ? "text-emerald-600" : "text-gray-600"}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-3">
        <Button onClick={onSearchClick} className="p-1">
          <Search size={22} className="text-gray-700 hover:text-emerald-600 transition" />
        </Button>
        <Link href="/cart" className="relative p-1">
          <ShoppingCart size={22} className="text-gray-700 hover:text-emerald-600 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        {/* Desktop login/profile */}
        <div className="hidden lg:flex items-center gap-2 ml-2">
          <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition">
            Login
          </Link>
          <Link href="/auth/signup" className="text-sm font-semibold bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition">
            Sign Up
          </Link>
        </div>
        <Link href="/auth/login" className="p-1 lg:hidden">
          <User size={22} className="text-gray-700" />
        </Link>
      </div>
    </header>
  );
}
