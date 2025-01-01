import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-500">
          Courverse
        </Link>

        {/* Navigation Links */}
        <div className="space-x-8 flex items-center">
          <Link href="/" className="text-lg hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
            Home
          </Link>
          <Link href="/courses" className="text-lg hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
            Courses
          </Link>
          <Link href="/dashboard" className="text-lg hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
            Dashboard
          </Link>
          <Link href="/profile" className="text-lg hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
            Profile
          </Link>

          {/* Daisy UI Button - Optional for actions */}
          <Link href="/signup">
            <button className="btn btn-primary hover:btn-secondary transition-all duration-200 ease-in-out">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
