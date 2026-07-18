"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "learner" | "publisher";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("learner");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text">Create your account</h1>
      <p className="mt-2 text-sm text-text-secondary">Start learning in less than a minute.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("learner")}
          className={`flex flex-col items-center gap-2 rounded-card border p-4 text-sm font-medium transition-colors ${
            role === "learner" ? "border-primary bg-primary-light text-primary-hover" : "border-border text-text-secondary hover:bg-background-secondary"
          }`}
        >
          <GraduationCap className="h-5 w-5" />
          I'm a learner
        </button>
        <button
          type="button"
          onClick={() => setRole("publisher")}
          className={`flex flex-col items-center gap-2 rounded-card border p-4 text-sm font-medium transition-colors ${
            role === "publisher" ? "border-primary bg-primary-light text-primary-hover" : "border-border text-text-secondary hover:bg-background-secondary"
          }`}
        >
          <Briefcase className="h-5 w-5" />
          I'm a publisher
        </button>
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            router.push("/verify-email");
          }, 1200);
        }}
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium text-text">Full name</label>
          <input
            id="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
        </div>

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
          <label htmlFor="password" className="text-sm font-medium text-text">Password</label>
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

        <label className="flex items-start gap-2 text-xs text-text-secondary">
          <input required type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          I agree to the Terms of Service and Privacy Policy.
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : `Create ${role} account`}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </div>
  );
}
