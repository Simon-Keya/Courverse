import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the API
    axios.get('/api/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} id={course.id} title={course.title} description={course.description} />
      ))}
    </div>
  );
};

export default CourseList;
