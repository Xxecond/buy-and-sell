"use client";

import { Home, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Cart", href: "/cart", icon: ShoppingCart },
    {
      label: user ? (user.name ? user.name.split(" ")[0] : "Profile") : "Login",
      href: user ? "/dashboard" : "/auth/login",
      icon: User,
    },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center justify-around py-2 pb-4 lg:hidden">
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5"
          >
            <Icon
              size={22}
              className={active ? "text-emerald-700" : "text-gray-400"}
            />
            <span
              className={`text-xs ${active ? "text-emerald-700 font-semibold" : "text-gray-400"}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
