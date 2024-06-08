import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CourseContent from './CourseContent';
import '../styles/Course/CourseDetail.css';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    // Fetch course details from the API
    axios.get(`/api/courses/${courseId}`).then((response) => {
      setCourse(response.data);
    });
  }, [courseId]);

  return (
    <div className="container mx-auto mt-8">
      {course ? (
        <>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-4">{course.description}</p>
          <CourseContent lessons={course.lessons} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseDetail;
