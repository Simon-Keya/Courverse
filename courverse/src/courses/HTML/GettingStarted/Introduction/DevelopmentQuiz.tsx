import React, { useState } from 'react';
import './styles/developmentquiz.css';

const DevelopmentQuiz: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSubmit = () => {
        if (selectedAnswer === 'HTML5') {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div>
            <h2>Which is the latest version of HTML?</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="HTML6.2" 
                            checked={selectedAnswer === 'HTML6.2'}
                            onChange={() => setSelectedAnswer('HTML6.2')} 
                        />
                        HTML6.2
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="HTML5" 
                            checked={selectedAnswer === 'HTML5'}
                            onChange={() => setSelectedAnswer('HTML5')} 
                        />
                        HTML5
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="HTML 6.0" 
                            checked={selectedAnswer === 'HTML 6.0'}
                            onChange={() => setSelectedAnswer('HTML 6.0')} 
                        />
                        HTML 6.0
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="HTML 4" 
                            checked={selectedAnswer === 'HTML 4'}
                            onChange={() => setSelectedAnswer('HTML 4')} 
                        />
                        HTML 4
                    </label>
                </div>
                <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">
                    Submit
                </button>
            </form>
            {isCorrect !== null && (
                <div className={`mt-4 p-2 ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {isCorrect ? 'Correct!' : 'Incorrect. The correct answer is "HTML5".'}
                </div>
            )}
        </div>
    );
};

export default DevelopmentQuiz;
