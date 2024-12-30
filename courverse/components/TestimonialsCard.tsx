import { FC } from "react";

interface TestimonialCardProps {
    name: string;
    role: string;
    testimonial: string;
    imageUrl: string;
  }
  
  const TestimonialCard: FC<TestimonialCardProps> = ({ name, role, testimonial, imageUrl }) => {
    return (
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
        <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" />
        <p className="text-lg italic">"{testimonial}"</p>
        <h4 className="font-semibold mt-4">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    );
  };
  
  export default TestimonialCard;
  