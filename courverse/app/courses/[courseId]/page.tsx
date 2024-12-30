"use client";

import axios from "axios";
import { useParams } from "next/navigation"; // Updated to use useParams from Next.js
import { useEffect, useState } from "react";

// Define the type for the course data
type Course = {
  title: string;
  description: string;
  learningPoints: string[];
  modules: string[];
};

export default function CourseDetailsPage() {
  const { courseId } = useParams(); // Using useParams to fetch courseId from the URL

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (courseId) {
      async function fetchCourse() {
        try {
          const response = await axios.get<Course>(`/api/courses/${courseId}`);
          setCourse(response.data);
        } catch (error) {
          console.error("Error fetching course details:", error);
        }
      }
      fetchCourse();
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center">{course.title}</h1>
        <p className="mt-6 text-lg text-center">{course.description}</p>
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold">What you'll learn:</h2>
          <ul className="list-disc pl-10">
            {course.learningPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold">Course Modules:</h2>
          <ul className="list-disc pl-10">
            {course.modules.map((module: string, index: number) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-10">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => alert("Enrolled successfully!")}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
