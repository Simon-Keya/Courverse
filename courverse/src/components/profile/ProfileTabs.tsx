"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/profile", label: "Overview" },
  { href: "/profile/settings", label: "Settings" },
  { href: "/profile/security", label: "Security" },
];

export function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className="flex w-fit items-center gap-1 rounded-input border border-border bg-white p-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-btn px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary-light text-primary-hover" : "text-text-secondary hover:text-text"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
