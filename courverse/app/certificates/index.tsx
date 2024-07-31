import Link from 'next/link';

const Certificates = () => {
  // Fetch list of certificates

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Certificates</h2>
        {/* List of certificates go here */}
        <div className="mt-6">
          <Link href="/certificates/certificateId" passHref>
            <span className="text-blue-600 hover:underline cursor-pointer">Certificate 1</span>
          </Link>
        </div>
        {/* Add more certificates as needed */}
      </div>
    </div>
  );
};

export default Certificates;
