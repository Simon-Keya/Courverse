export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Courverse. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by Simon Keya</p>
        </div>
      </footer>
    );
  }
  