"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { currentUser } from "@/data/mock";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Profile</h1>
      <div className="mt-4"><ProfileTabs /></div>

      <form
        className="mt-8 max-w-2xl space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
      >
        {/* Avatar */}
        <div className="card-surface flex items-center gap-5 p-6">
          <div className="relative">
            <Image src={currentUser.avatarUrl} alt={currentUser.name} width={72} height={72} className="rounded-full" />
            <button type="button" aria-label="Change avatar" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="font-heading font-semibold text-text">Profile photo</p>
            <p className="text-sm text-text-secondary">JPG or PNG, at least 200×200px.</p>
          </div>
        </div>

        {/* Basic info */}
        <div className="card-surface space-y-5 p-6">
          <p className="font-heading font-semibold text-text">Basic information</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-text" htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                defaultValue={currentUser.name}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                defaultValue={currentUser.email}
                className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows={3}
              placeholder="Tell other learners a bit about yourself…"
              className="mt-1.5 w-full rounded-input border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="card-surface space-y-4 p-6">
          <p className="font-heading font-semibold text-text">Notification preferences</p>
          {[
            "Email me about new course recommendations",
            "Email me weekly progress summaries",
            "Notify me about rewards and achievements",
          ].map((label) => (
            <label key={label} className="flex items-center justify-between gap-4 text-sm text-text">
              {label}
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
            </label>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm font-medium text-primary">Changes saved</span>}
        </div>
      </form>
    </div>
  );
}
