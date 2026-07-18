"use client";

import { useState } from "react";
import { Laptop, Smartphone, ShieldCheck } from "lucide-react";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { Button } from "@/components/ui/button";

const sessions = [
  { id: "s1", device: "MacBook Pro · Chrome", location: "Nairobi, Kenya", current: true, icon: Laptop },
  { id: "s2", device: "iPhone 15 · Courverse App", location: "Nairobi, Kenya", current: false, icon: Smartphone },
];

export default function ProfileSecurityPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Profile</h1>
      <div className="mt-4"><ProfileTabs /></div>

      <div className="mt-8 max-w-2xl space-y-8">
        {/* Change password */}
        <form
          className="card-surface space-y-5 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
        >
          <p className="font-heading font-semibold text-text">Change password</p>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="current">Current password</label>
            <input
              id="current"
              type="password"
              required
              className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-text" htmlFor="new">New password</label>
              <input
                id="new"
                type="password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text" htmlFor="confirm">Confirm new password</label>
              <input
                id="confirm"
                type="password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit">Update password</Button>
            {saved && <span className="text-sm font-medium text-primary">Password updated</span>}
          </div>
        </form>

        {/* Two-factor */}
        <div className="card-surface flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading font-semibold text-text">Two-factor authentication</p>
              <p className="text-sm text-text-secondary">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <Button variant="secondary">Enable</Button>
        </div>

        {/* Active sessions */}
        <div className="card-surface p-6">
          <p className="font-heading font-semibold text-text">Active sessions</p>
          <div className="mt-4 space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-card border border-border p-4">
                <div className="flex items-center gap-3">
                  <s.icon className="h-5 w-5 text-text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-text">
                      {s.device} {s.current && <span className="ml-1 text-xs font-semibold text-primary">(this device)</span>}
                    </p>
                    <p className="text-xs text-text-secondary">{s.location}</p>
                  </div>
                </div>
                {!s.current && (
                  <button className="text-sm font-medium text-error hover:underline">Log out</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
