import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://courverse.app",
  ),
  title: {
    default: "Courverse — Learn skills that stick",
    template: "%s · Courverse",
  },
  description:
    "A multi-category online learning platform for learners, publishers, and teams. Track progress, earn certificates, and grow with purpose.",
  openGraph: {
    title: "Courverse — Learn skills that stick",
    description:
      "Learn technology, business, design, languages, and more on Courverse.",
    type: "website",
    siteName: "Courverse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courverse — Learn skills that stick",
    description:
      "A multi-category online learning platform for learners and publishers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <QueryProvider>
          <AuthProvider>
            <div id="main-content">{children}</div>
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
