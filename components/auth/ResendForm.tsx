"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import useCountdown from "@/components/hooks/useCountdown";
import { resendVerificationEmail } from "@/lib/auth";
import Spinner from "../ui/Spinner";
import { Polling } from "@/components/hooks/pollingSession";
import { Mail, MessageSquare, TriangleAlert } from "lucide-react";

export default function ResendForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { startPolling, polling } = Polling();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setMessage("");

    setLoading(true);

    try {
      const deviceId = crypto.randomUUID();
      const data = await resendVerificationEmail(email, deviceId);
      setMessage(data.message);
      startPolling(deviceId);
    } catch (err: unknown) {
      setError(
        typeof err === "string" ? err : "Failed to send verification email",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-5/6 flex flex-col space-y-5">
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

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-emerald-200 rounded-xl p-2">
            <TriangleAlert className="text-red-600 shrink-0" size={20} />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {polling && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-2">
            <Mail className="text-emerald-600 shrink-0" size={20} />
            <div>
              <p className="text-emerald-600 text-xs mt-0.5">{message}</p>
            </div>
          </div>
        )}

        {!polling && message && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-2">
            <MessageSquare className="text-emerald-600 shrink-0" size={20} />
            <p className="text-green-600 text-sm text-center">{message}</p>
          </div>
        )}

        <Button variant="special" disabled={loading || polling}>
          {loading ? (
            "Sending..."
          ) : polling ? (
            <>
              Waiting for verification...
              <Spinner size="sm" color="text-green" />
            </>
          ) : (
            "Send email"
          )}
        </Button>
      </form>
    </div>
  );
}
