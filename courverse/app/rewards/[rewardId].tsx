import { useRouter } from 'next/router';

const Reward = () => {
  const router = useRouter();
  const { rewardId } = router.query;

  // Fetch reward details using rewardId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Reward - {rewardId}</h2>
        {/* Reward content goes here */}
      </div>
    </div>
  );
};

export default Reward;
