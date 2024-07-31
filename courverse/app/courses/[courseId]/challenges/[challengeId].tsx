import { useRouter } from 'next/router';

const Challenge = () => {
  const router = useRouter();
  const { courseId, challengeId } = router.query;

  // Fetch challenge details using courseId and challengeId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Challenge - {challengeId} for Course - {courseId}</h2>
        {/* Challenge content goes here */}
      </div>
    </div>
  );
};

export default Challenge;
