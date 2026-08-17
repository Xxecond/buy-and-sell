"use client";
import { useEffect, useState, useRef } from "react";
import { checkVerification } from "@/lib/auth";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export const Polling = () => {
  const { loginWithToken } = useAuth();
  const router = useRouter();
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  useEffect(() => () => stopPolling(), []);

  const startPolling = (deviceId: string) => {
    setPolling(true);

    intervalRef.current = setInterval(async () => {
      const result = await checkVerification(deviceId);
      console.log("[poll]", result);

      if (result.verified) {
        stopPolling();
        setPolling(false);
        if (result.user) loginWithToken(result.user);
        router.push("/dashboard");
      }
    }, 2000);

    timeoutRef.current = setTimeout(() => {
      stopPolling();
      setPolling(false);
      setMessage("");
      setError("Link expired! Click resend email for a new verification link.");
    }, 300000);
  };

  return { startPolling, stopPolling, polling, error, message };
};