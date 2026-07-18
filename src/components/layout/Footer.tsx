import Link from "next/link";
import { GraduationCap } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/courses", label: "Browse courses" },
      { href: "/categories", label: "Categories" },
      { href: "/pricing", label: "Pricing" },
      { href: "/publishers", label: "Publishers" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Teach",
    links: [
      { href: "/publishers", label: "Become a publisher" },
      { href: "/pricing", label: "Publisher pricing" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-bold text-text">Courverse</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-text-secondary">
            Learn skills that stick. Progress, rewards, and real courses from publishers who know their craft.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-text">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-text-secondary">© {new Date().getFullYear()} Courverse. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-text-secondary">
            <Link href="/pricing" className="hover:text-text">Terms</Link>
            <Link href="/pricing" className="hover:text-text">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
