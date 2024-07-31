import Link from 'next/link';

const Quizzes = () => {
  // Fetch list of quizzes

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Quizzes</h2>
        {/* List of quizzes go here */}
        <div className="mt-6">
          <Link href="/quizzes/quizId" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Quiz 1</span>
          </Link>
        </div>
        {/* Add more quizzes as needed */}
      </div>
    </div>
  );
};

export default Quizzes;
