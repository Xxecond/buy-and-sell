"use client";

import { useState } from "react";
import useCountdown from "./useCountdown";
import { useAuth } from "@/contexts/authContext";

export default function useEmailVerification() {
  const { signup } = useAuth();

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const { countdown, startCountdown, canResend } = useCountdown(60);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    setMessage("");

    if (!canResend) {
      setError(`Please wait ${countdown}s before trying again`);

      return;
    }

    setLoading(true);

    try {
      const deviceId = crypto.randomUUID();
      await signup(name, email, password, deviceId);

      setMessage("Account created. Check your email to verify your account.");

      startCountdown();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,

    email,
    setEmail,

    password,
    setPassword,

    loading,

    message,

    error,

    countdown,

    canResend,

    handleSubmit,
  };
}
