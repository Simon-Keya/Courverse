"use client";

import { useState } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);

  return (
    <div className="text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
        <MailCheck className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-heading text-2xl font-bold text-text">Check your inbox</h1>
      <p className="mt-2 text-sm text-text-secondary">
        We sent a verification link to <span className="font-medium text-text">you@example.com</span>. Click it to activate your account.
      </p>

      <Button
        className="mt-8 w-full"
        variant="secondary"
        onClick={() => setResent(true)}
        disabled={resent}
      >
        {resent ? "Email resent" : "Resend email"}
      </Button>

      <p className="mt-6 text-sm text-text-secondary">
        Wrong email?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-primary-hover">
          Go back
        </Link>
      </p>
    </div>
  );
}
