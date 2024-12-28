'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Poppins, Roboto } from "next/font/google";

const roboto = Roboto({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
});

const poppins = Poppins({
    weight: ['300', '400', '600'],
    style: 'normal',
    subsets: ['latin'],
});

const Earn = () => {
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getTotalEarnings = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/users/profile');
                if (response.data && response.data.data && response.data.data.moneyEarned) {
                    setTotal(response.data.data.moneyEarned);
                } else {
                    setTotal(null);
                }
            } catch (error) {
                toast.error("Please login first!");
                setTotal(null);
                setTimeout(() => {
                    router.push('/login');
                }, 5000);
            } finally {
                setLoading(false);
            }
        };

        getTotalEarnings();
    }, []);

    return (
        <div className={``}>
            <div className={`mt-40 flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500 shadow-2xl rounded-lg p-6 max-w-lg mx-auto ${roboto.className}`}>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin border-t-4 border-white w-10 h-10 rounded-full"></div>
                        <p className="ml-4 text-white">Fetching User Earnings...</p>
                    </div>
                ) : (
                    <div className="text-center flex flex-col gap-y-5 text-white">
                        <h2 className={`${poppins.className} text-3xl tracking-wider font-normal`}>User Earnings</h2>
                        {total !== null ? (
                            <p className="text-3xl font-normal">₹ {total.toLocaleString()}</p>
                        ) : (
                            <p className="text-lg">No earnings data available. <br /> Please make sure you are logged in.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Earn;
