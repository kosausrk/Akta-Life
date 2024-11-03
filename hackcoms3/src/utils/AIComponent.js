import React, { useState } from 'react';
import Query from './ai.js'; // Adjust the path as needed


function AIComponent() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    const userInput = {
      major: 'Computer Science',
      courses: ['CSCI-141', 'CSCI-142-01', 'MATH-190', 'MATH-182,  CSCI-243'],
      grade: 'Freshmen',
      interests: ['Software Engineering'], // Ensure this is always an array
    };

    setLoading(true);
    try {
      const aiResponse = await Query(userInput);
      console.log('AI Response:', aiResponse);
      setResponse(aiResponse);
    } catch (error) {
      console.error('Error querying the AI:', error);
      setResponse('There was an error processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6 flex flex-col items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl max-w-2xl w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">AI Course Recommender</h2>
        <button
          onClick={handleButtonClick}
          className="w-full py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-300"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
        {response && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">Response:</h3>
            <p className="mt-2 text-gray-800">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIComponent;
