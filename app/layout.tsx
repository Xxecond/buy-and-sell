import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authContext";

export const metadata: Metadata = {
  title: "buy-and-sell Platform",
  description: "buy and sell online",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
