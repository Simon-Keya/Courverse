"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// Define types for the course data
interface Course {
  id: string;
  title: string;
  description: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data.courses); // Assuming the response has a "courses" array
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">Available Courses</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card shadow-lg bg-base-200">
              <div className="card-body">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p>{course.description}</p>
                <a
                  href={`/courses/${course.id}`}
                  className="btn btn-primary mt-4"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
