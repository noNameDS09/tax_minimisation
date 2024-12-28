'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Roboto } from "next/font/google";
import { calculateTax } from "@/utils/taxCalculator";

const roboto = Roboto({
    weight: '500',
    style: 'normal',
    subsets: ['latin']
})

const InvestInVehicles = () => {
    const [invest, setInvest] = useState({
        vehicleName: "",
        quantity: 0,
        price: 0
    });
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const buyvehicle = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/users/buyvehicle', {
                vehicleName: invest.vehicleName,
                quantity: invest.quantity,
                rate: invest.price,
            });
            setAmount(invest.price * invest.quantity + calculateTax(invest.price * invest.quantity, 0.005));
            toast.success(response.data.message);
            // router.refresh();
            window.location.reload();
            // router.push('/profile');
        } catch (error) {
            console.log('Error purchasing vehicle', error);
            setError('Failed to purchase vehicle. Please try again. Make sure you are logged in');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAmount(invest.quantity * invest.price + calculateTax(invest.price * invest.quantity, 0.005));
    }, [invest.quantity, invest.price]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvest((prevInvest) => ({ ...prevInvest, [name]: value }));
    };

    return (
        <div className={`flex justify-center items-center mt-16`}>
            <div className={`w-full max-w-md bg-white p-8 rounded-lg shadow-lg`}>
                <h1 className={`${roboto.className} text-3xl font-semibold text-gray-800 mb-8 text-center`}>Vehicles</h1>
                <form onSubmit={buyvehicle} className={`text-start`}>
                    <div className={`mb-4`}>
                        <label htmlFor="vehicleName" className={`block text-sm font-medium text-gray-700`}>Vehicle Name</label>
                        <input
                            id="vehicleName"
                            name="vehicleName"
                            type="text"
                            value={invest.vehicleName}
                            onChange={handleChange}
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter Vehicle Name"
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
                        <label htmlFor="price" className={`block text-sm font-medium text-gray-700`}>Price per Vehicle</label>
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
                            "Buy Vehicle"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );

}

export default InvestInVehicles;
