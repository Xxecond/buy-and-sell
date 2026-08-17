"use client";

import {
  ShoppingCart,
  Search,
  Menu,
  User,
  Package,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";

interface HeaderProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
  cartCount?: number;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/dashboard/categories" },
  { label: "New Arrivals", href: "/dashboard/new-arrivals" },
  { label: "Sale", href: "/dashboard/sale" },
  { label: "About", href: "/dashboard/about" },
];

export default function Header({
  onSearchClick,
  onMenuClick,
  cartCount = 0,
}: HeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 lg:px-12 py-3 flex items-center justify-between">
      {/* Mobile hamburger */}
      <button onClick={onMenuClick} className="p-1 lg:hidden">
        <Menu size={24} className="text-gray-700 " />
      </button>

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-xl text-emerald-700"
      >
        <Image
          src="/assets/logo.JPG"
          alt="Shoply Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="block">Shoply</span>
      </Link>

      {/* Desktop nav links */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition hover:text-emerald-700 ${pathname === link.href ? "text-emerald-700" : "text-gray-600"}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-3">
        <button onClick={onSearchClick} className="p-1">
          <Search
            size={22}
            className="text-gray-700 hover:text-emerald-700 transition"
          />
        </button>

        {/* Cart - always visible but behavior changes */}
        <Link href="/cart" className="relative p-1">
          <ShoppingCart
            size={22}
            className={`text-gray-700 hover:text-emerald-700 transition ${!user ? "opacity-50" : ""}`}
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User section */}
        {mounted && user ? (
          // Logged-in user menu
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="hidden lg:flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition"
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-700">
                  {user.name?.[0] || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.name?.split(" ")[0]}
              </span>
            </button>

            {/* Dropdown menu - positioned to not conflict with footer */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[60]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User size={16} />
                  My Account
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Package size={16} />
                  My Orders
                </Link>
                {user.role === "seller" && (
                  <Link
                    href="/seller/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Package size={16} />
                    Seller Dashboard
                  </Link>
                )}
                <hr className="my-2" />
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Guest user buttons - positioned to not conflict with footer
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition px-3 py-2"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold bg-emerald-700 text-white px-4 py-2 rounded-xl hover:bg-emerald-800 transition"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile login for guests */}
        {mounted && !user && (
          <Link href="/auth/login" className="p-1 lg:hidden">
            <User size={22} className="text-gray-700" />
          </Link>
        )}
      </div>
    </header>
  );
}
