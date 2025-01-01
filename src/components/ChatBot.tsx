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
    const [showFeatures, setShowFeatures] = useState(false);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [chatVisible, setChatVisible] = useState<boolean>(false);

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



    const handleStartChat = async () => {
        setLoading(true);
        setError(null);
        setPrompt("Hii");
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Hii", sender: 'user' }
        ]);

        try {
            const response = await axios.post('/api/users/chatbot', {prompt:"Hii"});
            const botResponse = response.data.output;

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: botResponse, sender: 'bot' }
            ]);
            setPrompt("")
        } catch (error) {
            console.error('Error during generating', error);
            setError('Failed to generate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-col lg:flex-row px-5 py-10 mt-16 ">
            <section className="py-16 px-4 sm:px-6 lg:px-8 selection:bg-sky-500/70 w-[50%]">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Chat with Our AI-Powered Chatbot
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Access instant support with our AI-powered chatbot. Our chatbot is designed to provide personalized advice
                        and guidance in real-time on a range of financial topics.
                    </p>

                    <div className="mt-10 flex justify-center items-center gap-x-12">
                        <div className="w-[45%]">
                            <h3 className="text-2xl font-semibold text-gray-800 cursor-pointer" onClick={() => setShowFeatures(!showFeatures)}>
                                Key Features
                            </h3>
                            {showFeatures && (
                                <ul className="mt-4 text-lg text-gray-600 list-disc pl-5">
                                    <li><strong>Personalized Tax-Saving Strategies:</strong> Receive tailored advice to optimize your tax savings.</li>
                                    <li><strong>Real-Time Financial Assistance:</strong> Get quick, interactive responses to your financial queries.</li>
                                    <li><strong>Investment Guidance:</strong> Get insights on investments and portfolio management based on your financial goals.</li>
                                    <li><strong>Accessible 24/7:</strong> Available anytime to answer your questions, no matter the hour.</li>
                                    <li><strong>Intelligent Conversations:</strong> Engage in real-time, intelligent conversations that help you make informed decisions.</li>
                                </ul>
                            )}
                        </div>

                        <div className="w-[45%]">
                            <h3 className="text-2xl font-semibold text-gray-800 cursor-pointer" onClick={() => setShowHowItWorks(!showHowItWorks)}>
                                How It Works
                            </h3>
                            {showHowItWorks && (
                                <ul className="mt-4 text-lg text-gray-600 list-disc pl-5">
                                    <li><strong>Step 1:</strong> Start a conversation by clicking on the chatbot icon on our website.</li>
                                    <li><strong>Step 2:</strong> Ask questions about tax-saving, investments, or financial strategies.</li>
                                    <li><strong>Step 3:</strong> Receive personalized answers, advice, and insights to assist you in making informed financial decisions.</li>
                                    <li><strong>Step 4:</strong> Continue the conversation anytime to explore more details and follow-up questions.</li>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className="text-lg text-gray-600">
                            With our AI-powered chatbot, managing your finances has never been easier. It's like having a financial advisor available at your fingertips, 24/7. Start chatting today and take control of your financial future.
                        </p>
                        <button
                            className="mt-6 px-6 py-3 text-white bg-sky-500 rounded-md hover:bg-sky-600 transition duration-300"
                            onClick={handleStartChat}
                        >
                            Start conversation
                        </button>
                    </div>
                </div>
            </section>
            <div
                className={`w-full md:w-2/3 lg:w-[30rem] mx-auto bg-[#f5f6fa] shadow-lg rounded-3xl p-8 space-y-6 transition-opacity duration-500 ${chatVisible ? 'opacity-100' : 'opacity-100'}`}
            >
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