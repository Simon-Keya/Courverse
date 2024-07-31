import { useRouter } from 'next/router';

const Progress = () => {
  const router = useRouter();
  const { progressId } = router.query;

  // Fetch progress details using progressId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Progress - {progressId}</h2>
        {/* Progress content goes here */}
      </div>
    </div>
  );
};

export default Progress;
