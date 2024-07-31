import Link from 'next/link';

const ProgressList = () => {
  // Fetch list of progress records

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Progress</h2>
        {/* List of progress records go here */}
        <div className="mt-6">
          <Link href="/progress/progressId" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Progress 1</span>
          </Link>
        </div>
        {/* Add more progress records as needed */}
      </div>
    </div>
  );
};

export default ProgressList;
