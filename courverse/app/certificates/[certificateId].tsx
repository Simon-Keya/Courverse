import { useRouter } from 'next/router';

const Certificate = () => {
  const router = useRouter();
  const { certificateId } = router.query;

  // Fetch certificate details using certificateId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Certificate - {certificateId}</h2>
        {/* Certificate content goes here */}
      </div>
    </div>
  );
};

export default Certificate;
