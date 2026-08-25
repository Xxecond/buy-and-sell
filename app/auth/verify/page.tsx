"use client";

import Link from "next/link";
import { ArrowLeftSquareIcon, CheckCircle, XCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";

function VerifyContent() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const { loginWithToken } = useAuth();

  const success = searchParams.get("success");
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const isSuccess = success === "true";
  const errorMessage = error ? decodeURIComponent(error) : null;

  useEffect(() => {
    if (isSuccess && token) {
      loginWithToken(JSON.parse(atob(token.split(".")[1])));
      router.push("/dashboard");
    }
  }, [isSuccess, token]);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-white px-6">
      <Link href="/auth/signup" className="absolute left-3 top-5 text-black">
        <ArrowLeftSquareIcon className="h-6 w-6 md:h-8 md:w-8" />
      </Link>

      <div className="absolute top-5 w-full px-8 text-center">
        <h1 className="text-lg font-bold md:text-xl">VERIFY EMAIL</h1>
      </div>

      <div className="w-full max-w-md space-y-6 text-center mt-16">
        {isSuccess ? (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm space-y-4">
            <CheckCircle className="mx-auto text-emerald-600" size={48} />
            <p className="text-2xl font-semibold text-emerald-600">Email Verified!</p>
            <p className="text-sm text-gray-600">
              Your email has been verified successfully.
            </p>
            </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm space-y-4">
            <XCircle className="mx-auto text-red-500" size={48} />
            <p className="text-2xl font-semibold text-red-600">Verification Failed</p>
            <p className="text-sm text-gray-600">{errorMessage}</p>
            <Link
              href="/auth/resend-verification"
              className="inline-flex w-full justify-center rounded-xl bg-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
            >
              Resend verification email
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm space-y-4">
            <p className="text-2xl font-semibold text-gray-600">Invalid Link</p>
            <p className="text-sm text-gray-500">
              No verification result found. Please check your email link.
            </p>
            <Link
              href="/auth/resend-verification"
              className="inline-flex w-full justify-center rounded-xl bg-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
            >
              Resend verification email
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
