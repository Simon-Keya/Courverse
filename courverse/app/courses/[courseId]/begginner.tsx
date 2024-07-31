import { useRouter } from 'next/router';

const BeginnerCourse = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Fetch beginner course content using courseId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Beginner Course - {courseId}</h2>
        {/* Beginner course content goes here */}
      </div>
    </div>
  );
};

export default BeginnerCourse;
