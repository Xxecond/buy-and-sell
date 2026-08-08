"use client";

import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authContext";
import Header from "@/components/layout/Header";
import HamburgerMenu from "@/components/layout/HamburgerMenu";
import SearchOverlay from "@/components/layout/SearchOverlay";
import BottomNav from "@/components/layout/BottomNav";
import { useState } from "react";
import { usePathname } from "next/navigation";

function LayoutShell({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && (
        <Header
          onMenuClick={() => setShowMenu(true)}
          onSearchClick={() => setShowSearch(true)}
        />
      )}
      <HamburgerMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
      
      {/* Main content area */}
      <main className={`flex-1`}>
        {children}
      </main>
      
      {!isAuthPage && <BottomNav />}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}