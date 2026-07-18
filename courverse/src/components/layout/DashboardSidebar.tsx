"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  navItems: DashboardNavItem[];
  roleLabel: string;
  onNavigate?: () => void;
}

export function DashboardSidebar({ navItems, roleLabel, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-heading text-base font-bold text-text">Courverse</p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-secondary">{roleLabel}</p>
          </div>
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
    </div>
  );
}
