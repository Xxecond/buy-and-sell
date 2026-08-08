"use client";

import { X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Help", href: "/help" },
];

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white relative w-72 h-full shadow-xl flex flex-col p-6 gap-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-bold text-xl text-emerald-700">
                <Image
                  src="/assets/logo.JPG"
                  alt="Shoply Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                Shoply
              </div>
              <button onClick={onClose}>
                <X size={24} className="text-gray-700" />
              </button>
            </div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="py-3 border-b border-gray-100 text-gray-700 font-medium hover:text-emerald-700 transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="absolute w-[80%] bottom-25 flex flex-col gap-3">
              {user ? (
                <>
                {user.role === "seller" && (
                    <Link
                      href="/seller/dashboard"
                      onClick={onClose}
                      className="w-full text-center py-3 border border-emerald-700 text-emerald-700 rounded-xl font-semibold"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 rounded-xl font-semibold"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="w-full text-center py-3 border border-emerald-700 text-emerald-700 rounded-xl font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={onClose}
                    className="w-full text-center py-3 bg-emerald-700 text-white rounded-xl font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 bg-black/40" onClick={onClose} />
        </div>
      )}
    </>
  );
}
