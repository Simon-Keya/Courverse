"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <MailCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-bold text-text">Check your email</h1>
        <p className="mt-2 text-sm text-text-secondary">
          If an account exists for that email, we've sent a link to reset your password.
        </p>
        <Link href="/login" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-bold text-text">Forgot your password?</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Enter the email linked to your account and we'll send you a reset link.
      </p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div>
          <label htmlFor="email" className="text-sm font-medium text-text">Email</label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
        </div>

        <Button type="submit" className="w-full">Send reset link</Button>
      </form>
    </div>
  );
}
