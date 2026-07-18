"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Bell, Flame, ChevronDown } from "lucide-react";
import { currentUser, notificationsList } from "@/data/mock";

export function LearnerTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <button onClick={onMenuClick} aria-label="Open menu" className="rounded-btn p-2 text-text-secondary hover:bg-background-secondary lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-input border border-border bg-background-secondary px-3 py-2 text-sm text-text-secondary sm:flex">
        <Search className="h-4 w-4" />
        <span>Search courses…</span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-challenge sm:flex">
          <Flame className="h-3.5 w-3.5" /> {currentUser.streak} day streak
        </span>

        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-full p-2 text-text-secondary hover:bg-background-secondary hover:text-text"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-error" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-card border border-border bg-white shadow-md">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-sm font-semibold text-text">Notifications</p>
                <Link href="/notifications" onClick={() => setNotifOpen(false)} className="text-xs font-medium text-primary hover:text-primary-hover">
                  View all
                </Link>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationsList.slice(0, 4).map((n) => (
                  <div key={n.id} className={`border-b border-border px-4 py-3 last:border-b-0 ${!n.read ? "bg-primary-light/30" : ""}`}>
                    <p className="text-sm font-medium text-text">{n.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{n.body}</p>
                    <p className="mt-1 text-[11px] text-text-secondary">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setUserOpen((v) => !v)} className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-background-secondary">
            <Image src={currentUser.avatarUrl} alt={currentUser.name} width={32} height={32} className="rounded-full" />
            <ChevronDown className="hidden h-4 w-4 text-text-secondary sm:block" />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-card border border-border bg-white p-2 shadow-md">
              <div className="border-b border-border px-3 py-2.5">
                <p className="text-sm font-semibold text-text">{currentUser.name}</p>
                <p className="text-xs text-text-secondary">{currentUser.email}</p>
              </div>
              <Link href="/profile" onClick={() => setUserOpen(false)} className="block rounded-btn px-3 py-2 text-sm text-text hover:bg-background-secondary">
                Profile
              </Link>
              <Link href="/profile/settings" onClick={() => setUserOpen(false)} className="block rounded-btn px-3 py-2 text-sm text-text hover:bg-background-secondary">
                Settings
              </Link>
              <Link href="/login" onClick={() => setUserOpen(false)} className="block rounded-btn px-3 py-2 text-sm text-error hover:bg-red-50">
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
