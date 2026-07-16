import type { Metadata } from "next";
import { ReactNode } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { SearchCommand } from "@/components/common/SearchCommand";
import { GlobalLoadingBar } from "@/components/common/GlobalLoadingBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://courverse.com"),

  title: {
    default: "Courverse | Learn Without Limits",
    template: "%s | Courverse",
  },

  description:
    "Modern online learning platform for students and publishers. Learn, earn certificates, complete challenges and level up your career.",

  keywords: [
    "online courses",
    "education",
    "learning",
    "typescript",
    "nestjs",
    "react",
    "nextjs",
    "coursera",
    "udemy",
    "programming",
  ],

  authors: [
    {
      name: "Courverse",
    },
  ],

  creator: "Courverse",

  publisher: "Courverse",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Courverse",
    description:
      "A modern online learning platform built for students, instructors and organizations.",

    url: "https://courverse.com",

    siteName: "Courverse",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Courverse",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Courverse",
    description:
      "Modern online learning platform built with Next.js and NestJS.",
    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <>
      <GlobalLoadingBar />

      <SearchCommand />

      <div className="min-h-screen flex flex-col bg-background">

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </div>

      <ScrollToTop />
    </>
  );
}