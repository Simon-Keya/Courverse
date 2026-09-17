"use client";

import { useAuthStore } from "@/store/auth.store";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-2xl font-bold text-text">Profile</h1>
      <p className="mt-1 text-text-secondary">
        Account data only — no demo placeholders.
      </p>
      <div className="mt-8 rounded-card border border-border bg-card p-6 text-sm text-text-secondary">
        {user ? (
          <p>
            Signed in as{" "}
            <span className="font-medium text-text">
              {user.email || user.username}
            </span>
            {user.role ? ` (${user.role})` : ""}.
          </p>
        ) : (
          <p>Sign in to view this page.</p>
        )}
      </div>
    </div>
  );
}
