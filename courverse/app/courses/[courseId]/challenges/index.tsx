import Link from 'next/link';
import { useRouter } from 'next/router';

const Challenges = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Fetch challenges using courseId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Challenges for Course - {courseId}</h2>
        {/* List of challenges go here */}
        <div className="mt-6">
          <Link href={`/courses/${courseId}/challenges/challengeId`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Challenge 1</span>
          </Link>
        </div>
        {/* Add more challenges as needed */}
      </div>
    </div>
  );
};

export default Challenges;
