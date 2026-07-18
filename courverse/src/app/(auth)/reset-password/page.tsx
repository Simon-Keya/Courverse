"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-bold text-text">Password updated</h1>
        <p className="mt-2 text-sm text-text-secondary">You can now log in with your new password.</p>
        <Button className="mt-8 w-full" onClick={() => router.push("/login")}>Go to login</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text">Set a new password</h1>
      <p className="mt-2 text-sm text-text-secondary">Choose a strong password you haven't used before.</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <div>
          <label htmlFor="password" className="text-sm font-medium text-text">New password</label>
          <div className="relative mt-1.5">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="w-full rounded-input border border-border px-3.5 py-2.5 pr-10 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm" className="text-sm font-medium text-text">Confirm new password</label>
          <input
            id="confirm"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            placeholder="Re-enter password"
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
        </div>

        <Button type="submit" className="w-full">Update password</Button>
      </form>
    </div>
  );
}
