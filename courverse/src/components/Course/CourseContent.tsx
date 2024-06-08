import React, { useState } from 'react';
import '../styles/Course/CourseContent.css';

interface Lesson {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

interface CourseContentProps {
  lessons: Lesson[];
}

const CourseContent: React.FC<CourseContentProps> = ({ lessons }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>(lessons.filter(lesson => lesson.completed).map(lesson => lesson.id));

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Lessons</h2>
      <ul className="mt-4 space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id} className={`p-4 border rounded shadow ${completedLessons.includes(lesson.id) ? 'bg-green-100' : 'bg-white'}`}>
            <h3 className="text-xl font-bold">{lesson.title}</h3>
            <p className="mt-2">{lesson.content}</p>
            <button
              onClick={() => handleCompleteLesson(lesson.id)}
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark as Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseContent;
