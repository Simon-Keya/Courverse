import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Course/CourseDetail.css';
import HTMLCourse from './HTML/HTML'; // Adjust the path as needed

const courses = {
  html: {
    title: 'HTML Course',
    description: 'Learn the basics of HTML and build the foundation for web development.',
    component: HTMLCourse,
  },
  // Add other courses here as needed
};

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course] = useState(courses[courseId]);

  return (
    <div className="container mx-auto mt-8">
      {course ? (
        <>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-4">{course.description}</p>
          <course.component />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseDetail;
