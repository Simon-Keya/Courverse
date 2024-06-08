import React from 'react';
import CourseList from '../components/Course/CourseList';

const CourseCatalog: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Courses</h1>
      <CourseList />
    </div>
  );
};

export default CourseCatalog;
