import React from 'react';
import CourseCard from './components/CourseCard';
import Layout from './components/Layout';

const courses = [
  { id: '1', title: 'Learn HTML', description: 'Beginner to Advanced', imageUrl: '/images/html-course.jpg' },
  { id: '2', title: 'Learn CSS', description: 'Beginner to Advanced', imageUrl: '/images/css-course.jpg' },
  // Add more courses here
];

const HomePage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Courverse</h1>
      <div className="flex flex-wrap justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
