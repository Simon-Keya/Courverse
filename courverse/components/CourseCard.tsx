import Link from "next/link";
import { FC } from "react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  courseId: string;
}

const CourseCard: FC<CourseCardProps> = ({ title, description, image, courseId }) => {
  return (
    <div className="card w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-500 mt-2">{description}</p>
        <Link href={`/courses/${courseId}`} className="btn btn-primary mt-4">
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
