import Link from 'next/link';
import { useRouter } from 'next/router';

const CourseDetails = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Fetch course details using courseId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Course Details - {courseId}</h2>
        {/* Course details go here */}
        <div className="mt-6">
          <Link href={`/courses/${courseId}/beginner`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Beginner</span>
          </Link>
        </div>
        <div className="mt-2">
          <Link href={`/courses/${courseId}/intermediate`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Intermediate</span>
          </Link>
        </div>
        <div className="mt-2">
          <Link href={`/courses/${courseId}/advanced`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Advanced</span>
          </Link>
        </div>
        <div className="mt-6">
          <Link href={`/courses/${courseId}/quizzes`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Quizzes</span>
          </Link>
        </div>
        <div className="mt-2">
          <Link href={`/courses/${courseId}/challenges`} passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Challenges</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
