"use client";

import { useState } from "react";
import { Bell, Trophy, Info, Flame, CheckCircle2 } from "lucide-react";
import { notificationsList as initialNotifications } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const typeIcons: Record<string, typeof Bell> = {
  reward: Trophy,
  info: Info,
  challenge: Flame,
  success: CheckCircle2,
};

const typeStyles: Record<string, string> = {
  reward: "bg-yellow-50 text-reward",
  info: "bg-blue-50 text-info",
  challenge: "bg-orange-50 text-challenge",
  success: "bg-primary-light text-primary",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">Notifications</h1>
          <p className="mt-1 text-text-secondary">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>Mark all as read</Button>
        )}
      </div>

      <div className="mt-6 card-surface divide-y divide-border">
        {notifications.map((n) => {
          const Icon = typeIcons[n.type] ?? Bell;
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`flex w-full items-start gap-4 px-6 py-4 text-left transition-colors hover:bg-background-secondary ${!n.read ? "bg-primary-light/20" : ""}`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${typeStyles[n.type] ?? "bg-background-secondary text-text-secondary"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-text">{n.title}</p>
                  {!n.read && <Badge variant="primary">New</Badge>}
                </div>
                <p className="mt-1 text-sm text-text-secondary">{n.body}</p>
                <p className="mt-1.5 text-xs text-text-secondary">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
