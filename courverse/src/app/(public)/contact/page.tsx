"use client";

import { useState } from "react";
import { Mail, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const channels = [
  { icon: Mail, title: "Email us", body: "support@courverse.com", href: "mailto:support@courverse.com" },
  { icon: MessageCircle, title: "Live chat", body: "Mon–Fri, 8am–6pm EAT", href: "#" },
  { icon: MapPin, title: "Office", body: "Nairobi, Kenya", href: "#" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">Get in touch</h1>
        <p className="mt-4 text-lg text-text-secondary">
          Questions about courses, publishing, or your account? We're happy to help.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {channels.map((c) => (
            <a key={c.title} href={c.href} className="card-surface flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-semibold text-text">{c.title}</p>
                <p className="mt-0.5 text-sm text-text-secondary">{c.body}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="card-surface p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-heading text-lg font-semibold text-text">Message sent</p>
              <p className="text-sm text-text-secondary">We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-text" htmlFor="name">Full name</label>
                  <input
                    id="name"
                    required
                    type="text"
                    className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text" htmlFor="email">Email</label>
                  <input
                    id="email"
                    required
                    type="email"
                    className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  required
                  type="text"
                  className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
                  placeholder="Tell us more…"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">Send message</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
