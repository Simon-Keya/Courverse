"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    // In production: exchange the `code`/`state` query params for a session
    // via your auth API, store the token, then redirect.
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  if (status === "error") {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-error">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-bold text-text">Sign-in failed</h1>
        <p className="mt-2 text-sm text-text-secondary">We couldn't complete sign-in. Please try again.</p>
        <Button className="mt-8 w-full" onClick={() => router.push("/login")}>Back to login</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="font-heading text-lg font-semibold text-text">Signing you in…</p>
      <p className="text-sm text-text-secondary">Hang tight, this only takes a second.</p>
    </div>
  );
}
