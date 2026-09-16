import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
        default: "bg-primary text-white hover:bg-primary-hover shadow-sm",
        secondary:
          "bg-white text-text border border-border hover:bg-background-secondary shadow-sm",
        outline:
          "bg-white text-text border border-border hover:bg-background-secondary shadow-sm",
        ghost: "bg-transparent text-text hover:bg-background-secondary",
        destructive: "bg-error text-white hover:bg-red-700 shadow-sm",
        link: "bg-transparent text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        xs: "px-2.5 py-1 text-xs",
        sm: "px-3.5 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        default: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
