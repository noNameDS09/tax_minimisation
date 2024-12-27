'use client';
import axios from "axios";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const roboto = Roboto({
    weight: '500',
    style: 'normal',
    subsets: ['latin']
})

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

    const buyStocks = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/users/buystocks', {
                stockSymbol: invest.stockSymbol,
                quantity: invest.quantity,
                price: invest.price,
            });
            setAmount(invest.price * invest.quantity);
            toast.success(response.data.message);

            router.refresh();
            router.push('/profile');
        } catch (error) {
            console.log('Error purchasing stocks', error);
            setError('Failed to purchase stocks. Please try again. Make sure you are logged in or try again later');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAmount(invest.quantity * invest.price);
    }, [invest.quantity, invest.price]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvest((prevInvest) => ({ ...prevInvest, [name]: value }));
    };

    return (
        <div className={`flex justify-center items-center mt-16`}>
            <div className={`w-full max-w-md bg-white p-8 rounded-lg shadow-lg`}>
                <h1 className={`${roboto.className} text-3xl font-semibold text-gray-800 mb-8 text-center`}>Stocks</h1>
    
                <form onSubmit={buyStocks}>
                    <div className={`mb-4`}>
                        <label htmlFor="stockSymbol" className={`block text-sm font-medium text-gray-700`}>Stock Symbol</label>
                        <input
                            id="stockSymbol"
                            name="stockSymbol"
                            type="text"
                            value={invest.stockSymbol}
                            onChange={handleChange}
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter Stock Symbol"
                            required
                        />
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
                        {loading ? "Processing..." : "Buy Stocks"}
                    </button>
                </form>
            </div>
        </div>
    );
    
}

export default InvestInStocks;