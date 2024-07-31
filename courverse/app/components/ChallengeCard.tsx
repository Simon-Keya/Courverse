import { useRouter } from 'next/router';
import React from 'react';

interface ChallengeCardProps {
  title: string;
  description: string;
  link: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, link }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link); // Navigate to the link
  };

  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <span 
            onClick={handleClick} 
            className="btn btn-primary cursor-pointer"
            role="button" // Makes it clear that this is an interactive element
            tabIndex={0} // Allows it to be focusable
            aria-label="Start Challenge" // Accessibility label
          >
            Start Challenge
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
