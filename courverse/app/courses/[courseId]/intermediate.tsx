import { useRouter } from 'next/router';

const IntermediateCourse = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Fetch intermediate course content using courseId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Intermediate Course - {courseId}</h2>
        {/* Intermediate course content goes here */}
      </div>
    </div>
  );
};

export default IntermediateCourse;
