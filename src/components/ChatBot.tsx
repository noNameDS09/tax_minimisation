'use client';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
// import toast from "react-hot-toast";

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatBot = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
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
            chatEndRef.current.scrollBy({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className={`px-5`}>
            <div className="mt-24 w-full md:w-2/3 lg:w-[30rem] mx-auto bg-gray-50 shadow-xl p-8 rounded-3xl ">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4 h-[calc(100vh-16rem)]  overflow-y-auto px-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg max-w-[75%] w-fit ${msg.sender === 'user' ? 'bg-green-400/[0.6] ml-auto text-right' : 'bg-gray-400 mr-auto text-left'}`}
                            >
                                <span>{msg.text}</span>
                            </div>
                        ))}
                        {loading && (
                            <div className="p-3 rounded-lg max-w-[75%] w-fit bg-gray-400 mr-auto text-left">
                                <span>Bot is typing...</span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className={`flex gap-x-1`}>
                        <input
                            id="prompt"
                            name="prompt"
                            type="text"
                            value={prompt}
                            onChange={handleChange}
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your query"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-10 flex items-center justify-center mt-2 p-1 text-white font-medium rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'}`}
                        >
                            &rarr;
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;