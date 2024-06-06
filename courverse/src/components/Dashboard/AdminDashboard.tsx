import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleDelete = (courseId: string) => {
    axios.delete(`/api/courses/${courseId}`).then(() => {
      setCourses(courses.filter(course => course.id !== courseId));
    });
  };

  return (
    <div>
      <ul>
        {courses.map(course => (
          <li key={course.id} className="p-4 bg-white border rounded shadow mb-4">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p>{course.description}</p>
            <button 
              className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-700"
              onClick={() => handleDelete(course.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManagement;
