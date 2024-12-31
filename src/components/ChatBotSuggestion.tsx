"use client"
import { useState } from 'react';
import axios from 'axios';
import {marked} from 'marked';
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');

  // Function to handle button click
  const handleClick = async () => {
    setLoading(true);
    setError('');
    setSuggestion('');
    
    try {
      // Sending a request to your Next.js API
      const response = await axios.get('/api/users/chatbotsuggestion');

      // Assuming the response data has a field 'message' with the suggestion
      setSuggestion(response.data.message);
    } catch (err) {
      setError('Error fetching suggestion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Chatbot Investment Suggestions</h1>
        
        <button
          onClick={handleClick}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {loading ? 'Loading...' : 'Get Chatbot Suggestion'}
        </button>

        {suggestion && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded">
            <h3 className="font-semibold">Chatbot Suggestion:</h3>
            {/* Convert the markdown suggestion to HTML */}
            <div
              className="prose mt-4"
              dangerouslySetInnerHTML={{
                __html: marked(suggestion),  // Convert markdown to HTML
              }}
            />
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
