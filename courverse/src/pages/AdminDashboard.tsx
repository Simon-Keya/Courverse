import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseManagement from '../components/Dashboard/CourseManagement';

const AdminDashboard: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the API
    axios.get('/api/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <CourseManagement courses={courses} />
    </div>
  );
};

export default AdminDashboard;
