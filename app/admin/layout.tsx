"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import {
  LayoutDashboard, Users, Store, Package, ShoppingBag,
  ClipboardList, Settings, ChevronRight, Shield,
  CreditCard, Star, Flag, Tag,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Seller Requests", href: "/admin/seller-requests", icon: ClipboardList },
  { label: "Sellers", href: "/admin/sellers", icon: Store },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Reports", href: "/admin/reports", icon: Flag },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) { router.push("/auth/login"); return; }
    if (user && user.role !== "admin") { router.push("/dashboard"); }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-gray-900 text-white shrink-0">
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-emerald-400" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{user.name}</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-700">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition"
          >
            <ChevronRight size={15} className="rotate-180" />
            Back to My Account
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white px-4 py-3 flex items-center gap-3">
        <Shield size={18} className="text-emerald-400" />
        <span className="font-bold">Admin Panel</span>
        <div className="ml-auto flex gap-2 overflow-x-auto">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap ${
                pathname === href ? "bg-emerald-600 text-white" : "text-gray-300"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 lg:p-8 p-4 pt-16 lg:pt-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
