export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        {/* Copyright */}
        <p className="text-lg font-semibold">
          &copy; {new Date().getFullYear()} <span className="text-pink-400">Courverse</span>. All rights reserved.
        </p>

        {/* Powered by */}
        <p className="text-sm mt-2 text-gray-300">
          Powered by <span className="font-medium text-yellow-400 hover:text-yellow-500 transition duration-300">Simon Keya</span>
        </p>

        {/* Social Media Links (Optional) */}
        <div className="mt-4 space-x-6">
          <a
            href="https://github.com/SimonKeya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500 transition duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/simonkeya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500 transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/SimonKeya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500 transition duration-300"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
