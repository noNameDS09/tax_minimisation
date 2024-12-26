'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
// show loading spin or bar 
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
        <div className="mt-40 flex justify-center items-center bg-white shadow-orange-950 shadow-sm w-1/4 h-40 rounded-lg mx-auto">
            {loading ? (
                <p>Fetching User Earnings...</p>
            ) : (
                <div className="text-center flex flex-col gap-y-5">
                    <h2>User Earnings</h2>
                    {total !== null ? (
                        <p>{total}</p>
                    ) : (
                        <p>No earnings data available. <br /> Please make sure you are logged in.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Earn;
