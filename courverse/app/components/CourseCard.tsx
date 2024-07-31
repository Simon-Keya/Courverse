"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Updated import
import React from 'react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description, imageUrl }) => {
  const router = useRouter();

  const handleViewCourseClick = () => {
    router.push(`/courses/${id}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <Image className="w-full" src={imageUrl} alt={title} width={400} height={200} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span 
          onClick={handleViewCourseClick} 
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          role="button" // Makes it clear that this is an interactive element
          tabIndex={0} // Allows it to be focusable
          aria-label={`View Course: ${title}`} // Accessibility label
        >
          View Course
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
