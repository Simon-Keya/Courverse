import Link from "next/link";
import { Search, Bell, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/categories", label: "Categories" },
  { href: "/publishers", label: "Publishers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-bold text-text">Courverse</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-btn px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background-secondary hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden items-center gap-2 rounded-input border border-border bg-background-secondary px-3 py-2 text-sm text-text-secondary transition-colors hover:border-primary sm:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search courses</span>
          </Link>
          <button
            aria-label="Notifications"
            className="relative rounded-full p-2 text-text-secondary transition-colors hover:bg-background-secondary hover:text-text"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
          </button>
          <Link href="/login" className="hidden sm:block">
            <Button variant="secondary" size="sm">Log in</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
