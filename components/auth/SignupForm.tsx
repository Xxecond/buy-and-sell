"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function SignupForm() {
  const { signup, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await signup(name, email, password);

      setMessage(data.message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="  w-5/6 flex flex-col space-y-5">
      <label className=" m-0">Name</label>

      <input
        type="text"
        value={name}
        placeholder="Andrews Ampadu"
        onChange={(e) => setName(e.target.value)}
        className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg"
        required
      />

      <label className=" m-0">Email</label>

      <input
        type="text"
        placeholder="andrewsampadu9@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg"
        required
      />

      <label className=" m-0">Password</label>

      <div aria-label="pd-section-1" className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="•••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg w-full "
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

      <div>
        <label className=" m-0">Confirm Password</label>

        <div aria-label="pd-section-2" className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" block ring-black ring focus:outline-none focus:ring-2 p-2 rounded-lg w-full"
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
      </div>

      <div className="flex space-x-2 md:space-x-3">
        <p className="text-xs md:text-sm">have an account?</p>

        <Link
          href="/auth/login"
          className="flex-1 text-emerald-600 text-xs md:text-sm"
        >
          login
        </Link>

        <Link
          href="/auth/resend-verification"
          className="text-emerald-600 text-xs md:text-sm"
        >
          resend email
        </Link>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {message && <p className="text-green-600">{message}</p>}

      <Button
        type="submit"
        variant="special"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Creating account..." : "Signup"}
      </Button>
    </form>
  );
}
