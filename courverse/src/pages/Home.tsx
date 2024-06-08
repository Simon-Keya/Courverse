import React from 'react';
import { Link } from 'react-router-dom';
import CourseList from '../components/Course/CourseList';
import './styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Courverse</h1>
      <p className="mt-4 text-center text-lg">
        Learn programming languages like Python, JavaScript, TypeScript, Java, C++, Go, and C#.
      </p>
      <div className="flex justify-center mt-8">
        <Link to="/courses" className="px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Browse Courses
        </Link>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center">Featured Courses</h2>
        <CourseList />
      </div>
    </div>
  );
};

export default Home;
