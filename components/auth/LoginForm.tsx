"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import {Button} from "@/components/ui/button";

export default function LoginForm({ className }: { className?: string }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      // success, you can redirect here if you want
      window.location.href = "/dashboard";  // or use router
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        variant={"special"}
        className="w-full "
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}