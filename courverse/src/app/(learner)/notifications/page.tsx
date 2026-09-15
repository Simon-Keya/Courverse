"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Loader2 } from "lucide-react";
import Link from "next/link";
import { notificationsApi } from "@/api/modules/notifications";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.list(),
    enabled: isAuthenticated,
    retry: 1,
  });

  const markAll = useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markOne = useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  if (!isAuthenticated) {
    return (
      <div className="container-page py-16 text-center">
        <Bell className="mx-auto h-12 w-12 text-text-secondary" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-text">Notifications</h1>
        <p className="mt-2 text-text-secondary">Log in to see notifications.</p>
        <Link href="/login" className="mt-6 inline-block text-primary hover:underline">
          Log in
        </Link>
      </div>
    );
  }

  const items = data || [];

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Notifications</h1>
          <p className="mt-1 text-text-secondary">
            {isLoading ? "Loading…" : `${items.length} notifications`}
          </p>
        </div>
        {items.some((n) => !n.isRead) && (
          <Button size="sm" variant="secondary" onClick={() => markAll.mutate()}>
            Mark all read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="mt-16 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-border py-16 text-center">
          <p className="font-heading font-semibold text-text">You&apos;re all caught up</p>
          <p className="mt-1 text-sm text-text-secondary">No notifications yet.</p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-card border border-border bg-white">
          {items.map((n) => (
            <li
              key={n.id}
              className={`flex items-start gap-3 px-5 py-4 ${!n.isRead ? "bg-primary-light/30" : ""}`}
            >
              <Bell className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text">{n.title}</p>
                <p className="mt-0.5 text-sm text-text-secondary">{n.message}</p>
                <p className="mt-1 text-xs text-text-secondary">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.isRead && (
                <button
                  onClick={() => markOne.mutate(n.id)}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Mark read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
