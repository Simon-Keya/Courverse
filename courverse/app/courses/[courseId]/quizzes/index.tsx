import Link from 'next/link';
import { useRouter } from 'next/router';

const Quizzes = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Fetch quizzes using courseId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Quizzes for Course - {courseId}</h2>
        {/* List of quizzes go here */}
        <div className="mt-6">
          <Link href={`/courses/${courseId}/quizzes/quizId`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Quiz 1</span>
          </Link>
        </div>
        {/* Add more quizzes as needed */}
      </div>
    </div>
  );
};

export default Quizzes;
