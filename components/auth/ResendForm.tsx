"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import useCountdown from "@/components/hooks/useCountdown";
import { resendVerificationEmail } from "@/lib/auth";

export default function ResendForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { countdown, startCountdown, canResend } = useCountdown(60);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setMessage("");

    if (!canResend) {
      setError(`Please wait ${countdown}s before trying again`);
      return;
    }

    setLoading(true);

    try {
      await resendVerificationEmail(email);

      setMessage("If this email exists, a verification link has been sent.");

      startCountdown();
    } catch (err: unknown) {
      setError(
        typeof err === "string" ? err : "Failed to send verification email",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-5">
        <p className="text-sm text-gray-600 text-center ">
          Enter email for verification link.
        </p>

        <label className=" m-0">Email</label>

        <input
          type="text"
          placeholder="andrewsampadu9@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg"
          required
        />

        <div className="w-full flex justify-center">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        <div className="w-full flex justify-center">
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
        </div>

        <Button variant="special" disabled={!canResend || loading}>
          {!canResend ? `Resend in ${countdown}s` : loading ? "Sending..." : "Send email"}
        </Button>
      </form>
    </div>
  );
}
