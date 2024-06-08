import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ProgressTracker from '../ProgressTracker';

interface Course {
  id: string;
  title: string;
  description: string;
}

const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: number }>({});
  const [totalLessons, setTotalLessons] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (currentUser) {
      // Fetch the enrolled courses for the current user
      axios.get<Course[]>(`/api/users/${currentUser.id}/enrolledCourses`).then((response) => {
        setEnrolledCourses(response.data);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    enrolledCourses.forEach((course) => {
      axios.get(`/api/courses/${course.id}`).then((response) => {
        const courseData: { id: string; lessons: { completed: boolean }[] } = response.data;
        setTotalLessons((prevTotalLessons) => ({
          ...prevTotalLessons,
          [course.id]: courseData.lessons.length,
        }));
        setCompletedLessons((prevCompletedLessons) => ({
          ...prevCompletedLessons,
          [course.id]: courseData.lessons.filter((lesson) => lesson.completed).length,
        }));
      });
    });
  }, [enrolledCourses]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      {currentUser ? (
        <>
          <h2 className="mt-4 text-2xl">Welcome, {currentUser.displayName || currentUser.email}</h2>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Enrolled Courses</h2>
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="p-4 bg-white border rounded shadow">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <p className="mt-2">{course.description}</p>
                  <ProgressTracker
                    completedLessons={completedLessons[course.id] || 0}
                    totalLessons={totalLessons[course.id] || 0}
                  />
                  <Link
                    to={`/courses/${course.id}`}
                    className="block px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Continue Course
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="mt-4 text-red-600">You need to be logged in to view your dashboard.</p>
      )}
    </div>
  );
};

export default UserDashboard;
