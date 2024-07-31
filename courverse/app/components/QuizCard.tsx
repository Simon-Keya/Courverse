import { useRouter } from 'next/router';
import React from 'react';

interface QuizCardProps {
  title: string;
  description: string;
  link: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, description, link }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(link);
  };

  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <span 
            onClick={handleNavigation}
            className="btn btn-primary cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Take Quiz"
          >
            Take Quiz
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;

