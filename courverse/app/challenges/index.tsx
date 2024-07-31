import Link from 'next/link';

const Challenges = () => {
  // Fetch list of challenges

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Challenges</h2>
        {/* List of challenges go here */}
        <div className="mt-6">
          <Link href="/challenges/challengeId" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Challenge 1</span>
          </Link>
        </div>
        {/* Add more challenges as needed */}
      </div>
    </div>
  );
};

export default Challenges;
