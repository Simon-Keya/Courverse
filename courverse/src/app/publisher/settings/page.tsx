"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { publisherProfile } from "@/data/publisher-mock";
import { Button } from "@/components/ui/button";

export default function PublisherSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Settings</h1>
      <p className="mt-1 text-text-secondary">Manage your publisher profile and payout details.</p>

      <form
        className="mt-6 max-w-2xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
      >
        <div className="card-surface flex items-center gap-5 p-6">
          <div className="relative">
            <Image src={publisherProfile.avatarUrl} alt={publisherProfile.name} width={72} height={72} className="rounded-full" />
            <button type="button" aria-label="Change avatar" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="font-heading font-semibold text-text">Publisher photo</p>
            <p className="text-sm text-text-secondary">Shown on your public profile and courses.</p>
          </div>
        </div>

        <div className="card-surface space-y-5 p-6">
          <p className="font-heading font-semibold text-text">Profile</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-text" htmlFor="name">Display name</label>
              <input
                id="name"
                type="text"
                defaultValue={publisherProfile.name}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue={publisherProfile.email}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="bio">Publisher bio</label>
            <textarea
              id="bio"
              rows={3}
              placeholder="Tell learners about your background…"
              className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="card-surface space-y-5 p-6">
          <p className="font-heading font-semibold text-text">Payout details</p>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="payout">Payout method</label>
            <input
              id="payout"
              type="text"
              defaultValue={publisherProfile.payoutMethod}
              className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
            />
          </div>
          <label className="flex items-center justify-between gap-4 text-sm text-text">
            Email me when a payout is processed
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm font-medium text-primary">Changes saved</span>}
        </div>
      </form>
    </div>
  );
}
