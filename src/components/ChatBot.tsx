'use client';
import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatBot = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean | false>(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPrompt(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setLoading(true);
        setError(null);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: prompt, sender: 'user' }
        ]);
        setPrompt("");

        try {
            const response = await axios.post('/api/users/chatbot', { prompt });
            const botResponse = response.data.output;

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: botResponse, sender: 'bot' }
            ]);
        } catch (error) {
            console.error('Error during generating', error);
            setError('Failed to generate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView(false);
        }
    }, [messages]);

    return (
        <div className="flex flex-wrap md:flex-col px-5 py-10 mt-16">
            <div>Hello</div>
            <div className="w-full md:w-2/3 lg:w-[30rem] mx-auto bg-[#f5f6fa] shadow-lg rounded-3xl p-8 space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800">ChatBot</h2>
                <div className="space-y-4 h-[calc(100vh-20.5rem)] overflow-y-auto px-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 pt-1 pb-1 rounded-sm max-w-[75%] w-fit ${msg.sender === 'user' ? 'bg-blue-500/80 text-white ml-auto shadow-custom2' : 'bg-gray-200 text-gray-800 mr-auto shadow-custom1'}`}
                        >
                            <span>{msg.text}</span>
                        </div>
                    ))}
                    {loading && (
                        <div className="p-2 pt-1 pb-1 rounded-lg max-w-[75%] w-fit bg-gray-300 text-gray-800 mr-auto">
                            <span>Bot is typing...</span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                    
                    <input
                        id="prompt"
                        name="prompt"
                        type="text"
                        value={prompt}
                        onChange={handleChange}
                        className="w-full p-3 pb-2 pt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-md focus:ring-blue-500"
                        placeholder="Type your message..."
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                    >
                        <span>&rarr;</span>
                    </button>

                </form>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ChatBot;