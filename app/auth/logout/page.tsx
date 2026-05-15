"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.replace("/auth/login");
  }, []);

  return null;
}
