"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Trophy, Award, Heart, User, GraduationCap, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-learning", label: "My Learning", icon: BookOpen },
  { href: "/rewards", label: "Rewards", icon: Trophy },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
];

export function LearnerSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-bold text-text">Courverse</span>
        </Link>
        <button onClick={onNavigate} aria-label="Close menu" className="rounded-full p-1.5 text-text-secondary hover:bg-background-secondary lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-light text-primary-hover"
                  : "text-text-secondary hover:bg-background-secondary hover:text-text"
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-card bg-background-secondary p-4">
          <p className="text-xs font-semibold text-text-secondary">Weekly goal</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
            <div className="h-full w-3/5 rounded-full bg-progress-gradient" />
          </div>
          <p className="mt-1.5 text-xs text-text-secondary">3 of 5 lessons this week</p>
        </div>
      </div>
    </div>
  );
}
