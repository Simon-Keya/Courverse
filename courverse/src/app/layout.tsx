import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const heading = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Courverse — Learn skills that stick",
  description: "An online learning platform for learners, publishers, and teams. Track progress, earn certificates, and grow with purpose.",
  openGraph: {
    title: "Courverse — Learn skills that stick",
    description: "An online learning platform for learners, publishers, and teams.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
