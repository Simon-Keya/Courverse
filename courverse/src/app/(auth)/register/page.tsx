"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/use-auth";
import { toast } from "sonner";

type Role = "learner" | "publisher";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("learner");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = useSignup();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    signup.mutate(
      { username, email, password },
      {
        onError: (err: any) => {
          toast.error(err?.message || "Registration failed");
        },
        onSuccess: () => {
          toast.success("Account created! Welcome to Courverse.");
        },
      },
    );
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text">Create your account</h1>
      <p className="mt-2 text-sm text-text-secondary">Start learning in less than a minute.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("learner")}
          className={`flex flex-col items-center gap-2 rounded-card border p-4 text-sm font-medium transition-colors ${
            role === "learner"
              ? "border-primary bg-primary-light text-primary-hover"
              : "border-border text-text-secondary hover:bg-background-secondary"
          }`}
        >
          <GraduationCap className="h-5 w-5" />
          I&apos;m a learner
        </button>
        <button
          type="button"
          onClick={() => setRole("publisher")}
          className={`flex flex-col items-center gap-2 rounded-card border p-4 text-sm font-medium transition-colors ${
            role === "publisher"
              ? "border-primary bg-primary-light text-primary-hover"
              : "border-border text-text-secondary hover:bg-background-secondary"
          }`}
        >
          <Briefcase className="h-5 w-5" />
          I&apos;m a publisher
        </button>
      </div>
      {role === "publisher" && (
        <p className="mt-2 text-xs text-text-secondary">
          Publisher accounts start as learners. Contact support or an admin to upgrade after signup.
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <div>
          <label htmlFor="username" className="text-sm font-medium text-text">
            Username
          </label>
          <input
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            autoComplete="username"
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
        </div>

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
          <label htmlFor="password" className="text-sm font-medium text-text">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
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

        <Button type="submit" className="w-full" disabled={signup.isPending}>
          {signup.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
