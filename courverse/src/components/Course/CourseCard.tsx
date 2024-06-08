import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Course/CourseCard.css';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description }) => {
  return (
    <div className="p-4 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2">{description}</p>
      <Link
        to={`/courses/${id}`}
        className="block px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        View Course
      </Link>
    </div>
  );
};

export default CourseCard;
