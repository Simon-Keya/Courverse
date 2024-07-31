import { useRouter } from 'next/router';

const Challenge = () => {
  const router = useRouter();
  const { challengeId } = router.query;

  // Fetch challenge details using challengeId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Challenge - {challengeId}</h2>
        {/* Challenge content goes here */}
      </div>
    </div>
  );
};

export default Challenge;
