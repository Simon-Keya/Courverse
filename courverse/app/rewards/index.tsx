import Link from 'next/link';

const Rewards = () => {
  // Fetch list of rewards

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Rewards</h2>
        {/* List of rewards go here */}
        <div className="mt-6">
          <Link href="/rewards/rewardId" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Reward 1</span>
          </Link>
        </div>
        {/* Add more rewards as needed */}
      </div>
    </div>
  );
};

export default Rewards;
