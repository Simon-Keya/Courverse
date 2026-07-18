import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "primary" | "info" | "reward" | "challenge" | "premium" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary-hover",
  info: "bg-blue-50 text-info",
  reward: "bg-yellow-50 text-yellow-700",
  challenge: "bg-orange-50 text-challenge",
  premium: "bg-purple-50 text-premium",
  neutral: "bg-background-secondary text-text-secondary",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("badge-pill", variantClasses[variant], className)}
      {...props}
    />
  );
}
