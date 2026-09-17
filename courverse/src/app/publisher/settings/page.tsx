"use client";

import { useAuthStore } from "@/store/auth.store";
import { useProfile } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function PublisherSettingsPage() {
  const localUser = useAuthStore((s) => s.user);
  const profile = useProfile();

  const user = profile.data || localUser;

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Publisher settings</h1>
      <p className="mt-1 text-sm text-text-secondary">Account identity from /auth/profile</p>
      {profile.isLoading && (
        <div className="mt-10 flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading profile…
        </div>
      )}
      {profile.isError && (
        <div className="mt-8 text-sm text-text-secondary">
          Could not refresh profile. Showing session data.
        </div>
      )}
      <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm">
        {user ? (
          <dl className="space-y-2 text-text">
            <div><dt className="text-text-secondary">Email</dt><dd className="font-medium">{user.email}</dd></div>
            <div><dt className="text-text-secondary">Username</dt><dd className="font-medium">{user.username}</dd></div>
            <div><dt className="text-text-secondary">Role</dt><dd className="font-medium">{user.role}</dd></div>
          </dl>
        ) : (
          <p className="text-text-secondary">Not signed in.</p>
        )}
      </div>
    </div>
  );
}
