import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  GraduationCap,
  Rocket,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing | Courverse",
  description:
    "Affordable plans for learners, educators and organizations.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students exploring new skills.",
    icon: GraduationCap,
    popular: false,
    features: [
      "Access free courses",
      "Track learning progress",
      "Community discussions",
      "Achievement badges",
      "Basic certificates",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "Unlock premium learning experience.",
    icon: Star,
    popular: true,
    features: [
      "Unlimited premium courses",
      "Offline downloads",
      "AI learning assistant",
      "Priority support",
      "Premium certificates",
      "Gamification rewards",
      "Skill assessments",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Learning management for organizations.",
    icon: Rocket,
    popular: false,
    features: [
      "Unlimited employees",
      "Organization analytics",
      "Custom branding",
      "Admin dashboard",
      "SSO Authentication",
      "Dedicated support",
      "Advanced reports",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-background">
      <section className="container py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Pricing
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Learn without limits
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Whether you&apos;re just beginning your learning journey or managing
            education across an organization, Courverse has a plan designed
            for you.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-primary shadow-lg"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <CardContent className="space-y-8 p-8">
                  <div className="space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <h2 className="text-3xl font-bold">
                      {plan.name}
                    </h2>

                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold">
                        {plan.price}
                      </span>

                      {plan.price !== "Free" &&
                        plan.price !== "Custom" && (
                          <span className="pb-2 text-muted-foreground">
                            /month
                          </span>
                        )}
                    </div>

                    <p className="text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href="/register">
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <section className="mt-28 rounded-3xl bg-primary px-10 py-16 text-center text-white">
          <ShieldCheck className="mx-auto mb-6 h-16 w-16" />

          <h2 className="text-4xl font-bold">
            30-Day Money Back Guarantee
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            We&apos;re confident you&apos;ll love learning with Courverse.
            If you&apos;re not satisfied, receive a full refund within
            your first 30 days.
          </p>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-8"
          >
            <Link href="/courses">
              Explore Courses
            </Link>
          </Button>
        </section>
      </section>
    </main>
  );
} 