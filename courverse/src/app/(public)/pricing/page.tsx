import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const learnerPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with core courses and progress tracking.",
    features: ["Access to free courses", "Progress tracking", "Basic certificates", "Community support"],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$12",
    period: "/month",
    description: "Unlock premium courses, rewards, and priority support.",
    features: [
      "Everything in Free",
      "All premium courses",
      "XP boosts & exclusive rewards",
      "Verified certificates",
      "Priority support",
    ],
    cta: "Start 7-day trial",
    highlighted: true,
  },
  {
    name: "Teams",
    price: "$8",
    period: "/user/mo",
    description: "For companies investing in their team's growth.",
    features: [
      "Everything in Plus",
      "Team analytics dashboard",
      "Centralized billing",
      "Dedicated account manager",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

const publisherPlans = [
  {
    name: "Standard",
    take: "You keep 70%",
    description: "Publish courses and reach learners on Courverse.",
    features: ["Unlimited course uploads", "Basic analytics", "Community reviews"],
  },
  {
    name: "Pro Publisher",
    take: "You keep 85%",
    description: "For publishers ready to scale and go premium.",
    features: ["Everything in Standard", "Premium course badge", "Advanced analytics dashboard", "Featured placement"],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border bg-background-secondary py-20 text-center">
        <div className="container-page">
          <span className="badge-pill bg-primary-light text-primary-hover mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> Simple, transparent pricing
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold text-text sm:text-5xl">
            Pick the plan that fits your goals
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-text-secondary">
            Start free. Upgrade any time you want more courses, rewards, and analytics.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {learnerPlans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlighted
                  ? "relative flex flex-col rounded-card border-2 border-primary bg-white p-8 shadow-md"
                  : "flex flex-col rounded-card border border-border bg-white p-8 shadow-sm"
              }
            >
              {plan.highlighted && (
                <Badge variant="primary" className="absolute -top-3 left-8">Most popular</Badge>
              )}
              <h3 className="font-heading text-lg font-semibold text-text">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-text">{plan.price}</span>
                <span className="text-sm text-text-secondary">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{plan.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8">
                <Button variant={plan.highlighted ? "primary" : "secondary"} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-background-secondary py-20">
        <div className="container-page">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">For publishers</h2>
            <p className="mt-3 text-text-secondary">Teach on Courverse and earn from every enrollment.</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {publisherPlans.map((plan) => (
              <div key={plan.name} className="card-surface p-8">
                <h3 className="font-heading text-lg font-semibold text-text">{plan.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{plan.take}</p>
                <p className="mt-3 text-sm text-text-secondary">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/publishers" className="mt-8 block">
                  <Button variant="secondary" className="w-full">Learn more</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
