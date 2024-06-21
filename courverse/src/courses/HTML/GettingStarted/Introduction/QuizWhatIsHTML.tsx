import React, { useState } from 'react';
import './styles/whatishtmlquiz.css';

const WhatIsHTMLQuiz: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSubmit = () => {
        if (selectedAnswer === 'Markup Language') {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div>
            <h2>What is HTML?</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="Markup Language" 
                            checked={selectedAnswer === 'Markup Language'}
                            onChange={() => setSelectedAnswer('Markup Language')} 
                        />
                        Markup Language
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="Machine Language" 
                            checked={selectedAnswer === 'Machine Language'}
                            onChange={() => setSelectedAnswer('Machine Language')} 
                        />
                        Machine Language
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="Programming Language" 
                            checked={selectedAnswer === 'Programming Language'}
                            onChange={() => setSelectedAnswer('Programming Language')} 
                        />
                        Programming Language
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="Scripting Language" 
                            checked={selectedAnswer === 'Scripting Language'}
                            onChange={() => setSelectedAnswer('Scripting Language')} 
                        />
                        Scripting Language
                    </label>
                </div>
                <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">
                    Submit
                </button>
            </form>
            {isCorrect !== null && (
                <div className={`mt-4 p-2 ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {isCorrect ? 'Correct!' : 'Incorrect. The correct answer is "Markup Language".'}
                </div>
            )}
        </div>
    );
};

export default WhatIsHTMLQuiz;
