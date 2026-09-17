"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, GraduationCap, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/use-auth";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["learner", "publisher"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "learner",
    },
  });

  const role = watch("role");

  const onSubmit = (values: RegisterForm) => {
    signup.mutate(values, {
      onError: (err: unknown) => {
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message: string }).message)
            : "Registration failed";
        toast.error(message);
      },
      onSuccess: () => toast.success("Account created! Welcome to Courverse."),
    });
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-text">Create your account</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Join Courverse as a learner or publisher.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setValue("role", "learner", { shouldValidate: true })}
          className={`flex items-center justify-center gap-2 rounded-btn border px-3 py-2.5 text-sm font-medium ${
            role === "learner"
              ? "border-primary bg-primary-light text-primary"
              : "border-border text-text-secondary"
          }`}
        >
          <GraduationCap className="h-4 w-4" /> Learner
        </button>
        <button
          type="button"
          onClick={() => setValue("role", "publisher", { shouldValidate: true })}
          className={`flex items-center justify-center gap-2 rounded-btn border px-3 py-2.5 text-sm font-medium ${
            role === "publisher"
              ? "border-primary bg-primary-light text-primary"
              : "border-border text-text-secondary"
          }`}
        >
          <Briefcase className="h-4 w-4" /> Publisher
        </button>
      </div>
      <input type="hidden" {...register("role")} />

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username" className="text-sm font-medium text-text">
            Username
          </label>
          <input
            id="username"
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            {...register("username")}
          />
          {errors.username && (
            <p id="username-error" role="alert" className="mt-1.5 text-xs text-error">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "reg-email-error" : undefined}
            className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p id="reg-email-error" role="alert" className="mt-1.5 text-xs text-error">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-text">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "reg-password-error" : undefined}
              className="w-full rounded-input border border-border px-3.5 py-2.5 pr-10 text-sm focus:border-primary focus:outline-none"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="reg-password-error" role="alert" className="mt-1.5 text-xs text-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={signup.isPending}>
          {signup.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
