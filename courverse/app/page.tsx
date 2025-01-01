"use client";
import Link from "next/link"; // Import Link from next/link
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    // Fetch a random image from Unsplash related to education or learning
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          "https://source.unsplash.com/random/1920x1080/?education,learning,study"
        );
        if (response.ok) {
          setBackgroundImage(response.url);
        } else {
          console.error("Failed to fetch the background image.");
        }
      } catch (error) {
        console.error("Error fetching the background image:", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen flex flex-col items-center justify-center ${
          backgroundImage ? "" : "bg-gray-900"
        } bg-cover bg-center ${backgroundImage ? `bg-[url(${backgroundImage})]` : ""}`}
      >
        <div className="bg-black bg-opacity-60 text-center p-10 rounded-md">
          <h1 className="text-4xl font-bold text-white">
            Welcome to{" "}
            <span className="text-5xl font-extrabold text-yellow-500">Courverse</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Your path to knowledge starts here. Join the community of learners and
            educators.
          </p>
          <div className="mt-8">
            {/* Use Link component for navigation */}
            <Link
              href="/courses"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md text-lg font-semibold transition duration-300"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
