import React, { useState } from 'react';
import Introduction from './GettingStarted/Introduction/Introduction';

const lessons = [
  { title: 'Introduction', component: Introduction },
  // Add more lessons here
];

const HTMLCourse: React.FC = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  const progress = ((currentLessonIndex + 1) / lessons.length) * 100;

  return (
    <div className="course-container">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <img src="/path/to/html-logo.png" alt="HTML Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">HTML</h1>
          <p className="ml-4">30 Lessons</p>
        </div>
        <div className="flex items-center">
          <div className="progress-bar bg-gray-700 rounded-full h-4 w-64 mr-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}%</p>
        </div>
      </header>
      <nav className="p-4 bg-gray-200">
        <ul className="lesson-list">
          {lessons.map((lesson, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${index === currentLessonIndex ? 'font-bold' : ''}`}
              onClick={() => setCurrentLessonIndex(index)}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </nav>
      <main className="p-4">
        <currentLesson.component />
        <div className="flex justify-between mt-4">
          <button
            onClick={previousLesson}
            className="bg-gray-500 text-white p-2 rounded"
            disabled={currentLessonIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={nextLesson}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={currentLessonIndex === lessons.length - 1}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default HTMLCourse;
