"use client";

import { useState } from "react";
import { adminProfile } from "@/data/admin-mock";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Settings</h1>
      <p className="mt-1 text-text-secondary">Platform configuration and your admin account.</p>

      <form
        className="mt-6 max-w-2xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
      >
        <div className="card-surface space-y-5 p-6">
          <p className="font-heading font-semibold text-text">Admin account</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-text" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                defaultValue={adminProfile.name}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue={adminProfile.email}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="card-surface space-y-4 p-6">
          <p className="font-heading font-semibold text-text">Platform settings</p>
          <label className="flex items-center justify-between gap-4 text-sm text-text">
            Require manual review before publishing new courses
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm text-text">
            Allow publishers to set custom pricing
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm text-text">
            Auto-flag courses with low ratings for review
            <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          </label>
        </div>

        <div className="card-surface space-y-5 p-6">
          <p className="font-heading font-semibold text-text">Default publisher revenue share</p>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={50}
              max={90}
              defaultValue={70}
              className="w-full accent-primary"
            />
            <span className="w-12 shrink-0 text-right text-sm font-semibold text-text">70%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit">Save settings</Button>
          {saved && <span className="text-sm font-medium text-primary">Settings saved</span>}
        </div>
      </form>
    </div>
  );
}
