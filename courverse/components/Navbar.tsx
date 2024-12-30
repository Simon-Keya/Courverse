import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Courverse
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/courses" className="hover:text-gray-300">
            Courses
          </Link>
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
