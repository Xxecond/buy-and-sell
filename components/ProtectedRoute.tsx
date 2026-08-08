"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "buyer" | "seller" | "admin";
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = "buyer", 
  redirectTo = "/auth/login" 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      // Check role if specified
      if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
        router.push("/"); // Redirect to home if wrong role
        return;
      }
    }
  }, [user, loading, router, requiredRole, redirectTo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (!user) return null;

  if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}