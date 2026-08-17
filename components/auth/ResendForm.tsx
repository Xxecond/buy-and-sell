"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import useCountdown from "@/components/hooks/useCountdown";
import { resendVerificationEmail } from "@/lib/auth";
import { Polling } from "@/components/hooks/pollingSession";
import { Mail } from "lucide-react";

export default function ResendForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { countdown, startCountdown, canResend } = useCountdown(60);
  const { startPolling, polling, error: pollingError } = Polling();

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
      const deviceId = crypto.randomUUID();
      await resendVerificationEmail(email, deviceId);
      setMessage("If this email exists, a verification link has been sent.");
      startCountdown();
      startPolling(deviceId);
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };

  const displayError = error || pollingError;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <p className="text-sm text-gray-600 text-center">
          Enter email for verification link.
        </p>

        <label className="m-0">Email</label>

        <input
          type="text"
          placeholder="andrewsampadu9@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg"
          required
          disabled={polling}
        />

        {displayError && (
          <div className="w-full flex justify-center">
            <p className="text-red-500 text-sm text-center">{displayError}</p>
          </div>
        )}

        {polling && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <Mail className="text-emerald-600 shrink-0" size={20} />
            <div>
              <p className="text-emerald-700 font-medium text-sm">Check your email</p>
              <p className="text-emerald-600 text-xs mt-0.5">{message}</p>
            </div>
            <div className="ml-auto w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin shrink-0" />
          </div>
        )}

        {!polling && message && (
          <div className="w-full flex justify-center">
            <p className="text-green-600 text-sm text-center">{message}</p>
          </div>
        )}

        <Button variant="special" disabled={!canResend || loading || polling}>
          {!canResend ? `Resend in ${countdown}s` : loading ? "Sending..." : polling ? "Waiting for verification..." : "Send email"}
        </Button>
      </form>
    </div>
  );
}
