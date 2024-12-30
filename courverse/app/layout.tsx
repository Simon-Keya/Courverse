import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Courverse - E-Learning Platform",
  description: "Welcome to Courverse, your ultimate e-learning platform for knowledge and skill development.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-100 font-sans antialiased">
        {/* Navbar */}
        <nav className="bg-indigo-600 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-white text-2xl font-bold">
                  Courverse
                </Link>
              </div>
              <div className="flex space-x-6">
                <Link href="/" className="text-white hover:text-indigo-200">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-indigo-200">
                  About
                </Link>
                <Link href="/courses" className="text-white hover:text-indigo-200">
                  Courses
                </Link>
                <Link href="/contact" className="text-white hover:text-indigo-200">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <div className="container mx-auto py-12">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-indigo-600 py-8 mt-16">
          <div className="text-center text-white">
            <p>&copy; {new Date().getFullYear()} Courverse. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
