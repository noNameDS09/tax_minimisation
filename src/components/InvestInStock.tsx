'use client';
import { calculateTax } from "@/utils/taxCalculator";
import axios from "axios";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const roboto = Roboto({
    weight: '500',
    style: 'normal',
    subsets: ['latin']
});

const InvestInStocks = () => {
    const [invest, setInvest] = useState({
        stockSymbol: "",
        quantity: 0,
        price: 0
    });
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const stockOptions = [
        { symbol: "AAPL", name: "APPLE" },
        { symbol: "MSFT", name: "MICROSOFT" },
        { symbol: "GOOGL", name: "GOOGLE" },
        { symbol: "AMZN", name: "AMAZON" },
        { symbol: "TSLA", name: "TESLA" },
        { symbol: "NVDA", name: "NVIDIA" },
        { symbol: "META", name: "META PLATFORMS" },
        { symbol: "JPM", name: "JPMORGAN CHASE" },
        { symbol: "V", name: "VISA" },
        { symbol: "MA", name: "MASTERCARD" },
    ];

    const fetchStockPrice = async (symbol: string) => {
        try {
            const response = await axios.get(`/api/users/getstockprice?symbol=${symbol}`);
            if (response.data && response.data.stockData) {
                setInvest((prevInvest) => ({ ...prevInvest, price: response.data.stockData }));
            }
        } catch (error) {
            setError("Failed to fetch stock price. Please try again.");
        }
    };

    const buyStocks = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/users/buystock', {
                stockSymbol: invest.stockSymbol,
                quantity: invest.quantity,
                rate: invest.price,
            });
            const totalAmount = invest.price * invest.quantity + calculateTax(invest.price * invest.quantity, 0.005);
            setAmount(totalAmount.toFixed(2));
            toast.success(response.data.message);

            // router.refresh();
            window.location.reload();
            // router.push('/profile');
        } catch (error) {
            console.log('Error purchasing stocks', error);
            setError('Failed to purchase stocks. Please try again. Make sure you are logged in or try again later');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const totalAmount = invest.quantity * invest.price + calculateTax(invest.price * invest.quantity, 0.005);
        setAmount(totalAmount.toFixed(2));
    }, [invest.quantity, invest.price]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'stockSymbol') {
            setInvest((prevInvest) => ({ ...prevInvest, [name]: value }));
            fetchStockPrice(value); // Fetch price whenever stock symbol changes
        } else {
            setInvest((prevInvest) => ({ ...prevInvest, [name]: parseFloat(value) }));
        }
    };

    return (
        <div className={`flex justify-center items-center mt-16`}>
            <div className={`w-full max-w-md bg-white p-8 rounded-lg shadow-lg`}>
                <h1 className={`${roboto.className} text-3xl font-semibold text-gray-800 mb-8 text-center`}>Stocks</h1>

                <form onSubmit={buyStocks} className={`text-start`}>
                    <div className={`mb-4`}>
                        <label htmlFor="stockSymbol" className={`block text-sm font-medium text-gray-700`}>Stock Symbol</label>
                        <select
                            id="stockSymbol"
                            name="stockSymbol"
                            value={invest.stockSymbol}
                            onChange={handleChange}
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        >
                            <option value="">Select Stock</option>
                            {stockOptions.map((option) => (
                                <option key={option.symbol} value={option.symbol}>
                                    {option.symbol} ({option.name})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`mb-4`}>
                        <label htmlFor="quantity" className={`block text-sm font-medium text-gray-700`}>Quantity</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={invest.quantity}
                            onChange={handleChange}
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter quantity to buy"
                            required
                        />
                    </div>
                    <div className={`mb-4`}>
                        <label htmlFor="price" className={`block text-sm font-medium text-gray-700`}>Price per Stock</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={invest.price}
                            onChange={handleChange}
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter price per stock"
                            required
                        />
                    </div>
                    <div className={`mb-4`}>
                        <label htmlFor="totalAmount" className={`block text-sm font-medium text-gray-700`}>Total Amount</label>
                        <input
                            id="totalAmount"
                            name="totalAmount"
                            type="number"
                            value={amount}
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Calculated amount"
                            disabled
                        />
                    </div>

                    {error && (
                        <div className={`bg-red-100 text-red-700 p-3 rounded-md mb-6`}>
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 mt-6 text-white font-medium rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'}`}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin border-t-4 border-white w-8 h-8 rounded-full"></div>
                            </div>
                        ) : (
                            "Buy Stocks"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InvestInStocks;
