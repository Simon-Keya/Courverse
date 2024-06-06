import React from 'react';

interface ProgressTrackerProps {
  completedLessons: number;
  totalLessons: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ completedLessons, totalLessons }) => {
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${progress}%` }}
      >
        {progress.toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressTracker;
