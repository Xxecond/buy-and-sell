"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, TriangleAlert, } from "lucide-react";
import Link from "next/link";

type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-5/6 flex flex-col space-y-5 ${className}`}>
      <label className="text-sm md:text-base">Email</label>
      <input
        type="email"
        placeholder="andrewsampadu9@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg w-full"
        required
      />
      <label className="text-sm md:text-base">Password</label>
      <div aria-label="pd-section" className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="•••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg w-full"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-black absolute translate-x-1/2 right-10 top-1/2 -translate-y-1/2 "
        >
          {showPassword ? (
            <EyeIcon className="w-6 h-6 md:w-8 md:h-8" />
          ) : (
            <EyeOffIcon className="w-6 h-6 md:w-8 md:h-8" />
          )}
        </button>
      </div>

      <div className="flex space-x-3">
        <p className="text-xs md:text-sm">Don&apos;t have an account?</p>
        <Link
          href="/auth/signup"
          className="text-emerald-600 text-xs md:text-sm"
        >
          signup
        </Link>
      </div>
      {error && <div className="flex items-center gap-3 bg-red-50 border border-emerald-200 rounded-xl p-2">
            <TriangleAlert className="text-red-600 shrink-0" size={20} /><p className="text-red-600 text-sm">{error}</p>
            </div>}

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
