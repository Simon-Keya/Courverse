"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const login = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);
    if (password.length < 6) {
      setFieldError("Password must be at least 6 characters.");
      return;
    }
    login.mutate(
      { email, password, remember },
      {
        onError: (err: unknown) => {
          const message =
            err && typeof err === "object" && "message" in err
              ? String((err as { message: string }).message)
              : "Invalid email or password";
          setFieldError(message);
          toast.error(message);
        },
        onSuccess: () => {
          toast.success("Welcome back!");
        },
      },
    );
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text">Welcome back</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Log in to continue where you left off.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-text">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:text-primary-hover"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1.5">
            <input
              id="password"
              aria-invalid={fieldError ? "true" : "false"}
              aria-describedby={fieldError ? "login-error" : undefined}
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
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
          <input
            type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Keep me logged in
        </label>

        {fieldError && (
          <p id="login-error" role="alert" className="text-sm text-error">
            {fieldError}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in…
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
