import Link from "next/link";
import { FC } from "react";
import Footer from "../components/Footer"; // Import Footer
import Navbar from "../components/Navbar"; // Import Navbar

const HomePage: FC = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          Welcome to Courverse
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover a wide range of courses to enhance your skills and career.
        </p>

        {/* Call to Action */}
        <Link
          href="/courses"
          className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Explore Courses
        </Link>

        <div className="mt-16 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Featured Courses</h2>
          <div className="flex space-x-6 mt-6">
            {/* Course Cards (Example) */}
            <div className="bg-gray-100 rounded-lg p-4 w-1/3">
              <h3 className="text-xl font-semibold text-gray-800">JavaScript Basics</h3>
              <p className="text-gray-600">Learn the fundamentals of JavaScript.</p>
              <Link
                href="/courses/javascript-basics"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Learn More
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 w-1/3">
              <h3 className="text-xl font-semibold text-gray-800">React for Beginners</h3>
              <p className="text-gray-600">Get started with React and build dynamic UIs.</p>
              <Link
                href="/courses/react-for-beginners"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Learn More
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 w-1/3">
              <h3 className="text-xl font-semibold text-gray-800">Python for Data Science</h3>
              <p className="text-gray-600">Master Python for data analysis and visualization.</p>
              <Link
                href="/courses/python-for-data-science"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
