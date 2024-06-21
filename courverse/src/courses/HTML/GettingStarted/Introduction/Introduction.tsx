import React, { useState } from 'react';
import DevelopmentQuiz from './DevelopmentQuiz';
import DevelopmentOfHTML from './HTMLDevelopment'; // Ensure this matches the exact file name
import WhatIsHTMLQuiz from './QuizWhatIsHTML'; // Ensure this matches the exact file name
import WhatIsHTML from './WhatIsHTML';

const Introduction: React.FC = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const previousStep = () => {
        setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
    };

    return (
        <div>
            <h1>Introduction to HTML</h1>
            {step === 0 && <WhatIsHTML />}
            {step === 1 && <WhatIsHTMLQuiz />}
            {step === 2 && <DevelopmentOfHTML />}
            {step === 3 && <DevelopmentQuiz />}

            <div className="flex justify-between mt-4">
                <button 
                    onClick={previousStep} 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    disabled={step === 0}
                >
                    Previous
                </button>
                <button 
                    onClick={nextStep} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={step >= 3} // Disable button after the last step
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Introduction;
