"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

interface DashboardTopbarProps {
  onMenuClick: () => void;
  searchPlaceholder: string;
  userName: string;
  userAvatarUrl: string;
  profileHref: string;
  notificationCount?: number;
}

export function DashboardTopbar({
  onMenuClick,
  searchPlaceholder,
  userName,
  userAvatarUrl,
  profileHref,
  notificationCount = 0,
}: DashboardTopbarProps) {
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <button onClick={onMenuClick} aria-label="Open menu" className="rounded-btn p-2 text-text-secondary hover:bg-background-secondary lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-input border border-border bg-background-secondary px-3 py-2 text-sm text-text-secondary sm:flex">
        <Search className="h-4 w-4" />
        <span>{searchPlaceholder}</span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button aria-label="Notifications" className="relative rounded-full p-2 text-text-secondary hover:bg-background-secondary hover:text-text">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
          )}
        </button>

        <div className="relative">
          <button onClick={() => setUserOpen((v) => !v)} className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-background-secondary">
            <Image src={userAvatarUrl} alt={userName} width={32} height={32} className="rounded-full" />
            <ChevronDown className="hidden h-4 w-4 text-text-secondary sm:block" />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-card border border-border bg-white p-2 shadow-md">
              <div className="border-b border-border px-3 py-2.5">
                <p className="text-sm font-semibold text-text">{userName}</p>
              </div>
              <Link href={profileHref} onClick={() => setUserOpen(false)} className="block rounded-btn px-3 py-2 text-sm text-text hover:bg-background-secondary">
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
