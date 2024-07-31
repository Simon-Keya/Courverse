import { useRouter } from 'next/router';

const Quiz = () => {
  const router = useRouter();
  const { quizId } = router.query;

  // Fetch quiz details using quizId

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">Quiz - {quizId}</h2>
        {/* Quiz content goes here */}
      </div>
    </div>
  );
};

export default Quiz;
