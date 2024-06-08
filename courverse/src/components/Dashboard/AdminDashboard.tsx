import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Dashboard/AdminDashboard.css';

interface User {
  id: string;
  displayName?: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get<User[]>('/api/users').then((response) => {
      setUsers(response.data);
    });
    axios.get<Course[]>('/api/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleDeleteUser = (userId: string) => {
    axios.delete(`/api/users/${userId}`).then(() => {
      setUsers(users.filter(user => user.id !== userId));
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    axios.delete(`/api/courses/${courseId}`).then(() => {
      setCourses(courses.filter(course => course.id !== courseId));
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="p-4 bg-white border rounded shadow mb-4">
              <h3 className="text-xl font-bold">{user.displayName || user.email}</h3>
              <button 
                className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Courses</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id} className="p-4 bg-white border rounded shadow mb-4">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <button 
                className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link
          to="/create-user"
          className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Create User
        </Link>
        <Link
          to="/create-course"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Create Course
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
