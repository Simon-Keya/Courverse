"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Social OAuth is not configured for this deployment.
 * Do not fake success with a timer. Enable when backend supports
 * GET/POST /auth/oauth/callback with code + state verification.
 */
export default function AuthCallbackPage() {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-error">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-heading text-2xl font-bold text-text">
        Social sign-in unavailable
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        OAuth is not connected yet. Use email and password to sign in.
      </p>
      <Button className="mt-8 w-full" asChild>
        <Link href="/login">Back to login</Link>
      </Button>
    </div>
  );
}
