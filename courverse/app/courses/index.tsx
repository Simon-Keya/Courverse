import Link from 'next/link';

const Courses = () => {
  // Fetch list of courses

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Courses</h2>
        {/* List of courses go here */}
        <div className="mt-6">
          <Link href="/courses/courseId" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Course 1</span>
          </Link>
        </div>
        {/* Add more courses as needed */}
      </div>
    </div>
  );
};

export default Courses;
