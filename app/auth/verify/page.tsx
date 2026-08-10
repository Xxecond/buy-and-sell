"use client";

import Link from "next/link";
import { ArrowLeftSquareIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const apiBase =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "missing"
  >(token ? "pending" : "missing");

  const [message, setMessage] = useState(
    token
      ? "Verifying your email..."
      : "Verification token is missing from the URL."
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${apiBase}/api/users/verify?token=${encodeURIComponent(token)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Email verification failed."
          );
        }

        setStatus("success");
        setMessage(
          data.message ||
            "Your email has been verified successfully."
        );

        window.setTimeout(() => {
          router.push("/auth/login");
        }, 2500);
      } catch (error: unknown) {
        setStatus("error");

        setMessage(
          error instanceof Error
            ? error.message
            : "There was an error verifying your email."
        );
      }
    };

    verifyEmail();
  }, [router, token]);

  const title =
    status === "success"
      ? "Authentication successful"
      : status === "pending"
        ? "Verifying email..."
        : "Verification failed";

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-white px-6 lg:w-1/2">
      <Link
        href="/"
        className="absolute left-3 top-5 text-black"
      >
        <ArrowLeftSquareIcon className="h-6 w-6 md:h-8 md:w-8" />
      </Link>

      <div className="absolute top-5 w-full px-8 text-center">
        <h1 className="text-lg font-bold md:text-xl">
          VERIFY EMAIL
        </h1>
      </div>

      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mt-24 rounded-3xl border border-gray-200 bg-emerald-50 p-8 shadow-sm">
          <p className="text-2xl font-semibold text-emerald-800">
            {title}
          </p>

          <p className="mt-4 text-sm text-gray-600">
            {message}
          </p>
        </div>

        {status !== "pending" && (
          <Link
            href="/auth/login"
            className="inline-flex w-full justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to login
          </Link>
        )}
      </div>
    </section>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Verifying email...</div>}>
      <VerifyContent />
    </Suspense>
  );
}