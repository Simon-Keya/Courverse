"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text">Welcome back</h1>
      <p className="mt-2 text-sm text-text-secondary">Log in to continue where you left off.</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 1200);
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

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-text">Password</label>
            <Link href="/forgot-password" className="text-xs font-medium text-primary hover:text-primary-hover">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1.5">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
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

        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          Keep me logged in
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-text-secondary">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-btn border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text shadow-sm transition-colors hover:bg-background-secondary">
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-primary-hover">
          Sign up
        </Link>
      </p>
    </div>
  );
}
