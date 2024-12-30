"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// Define the type for a Course
interface Course {
  id: string;
  title: string;
  description: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]); // Use the Course type

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/user/courses");
        setCourses(response.data.courses); // Assuming the response is in the correct format
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">My Courses</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card shadow-lg bg-base-200">
              <div className="card-body">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p>{course.description}</p>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => (window.location.href = `/courses/${course.id}`)}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
