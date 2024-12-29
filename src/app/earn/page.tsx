'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Poppins, Roboto } from "next/font/google";
import gsap from 'gsap';

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

    const [moneyEarned, setMoneyEarned] = useState<number>(0);

    const clicktoearn = async () => {
        try {
            const response = await axios.post('/api/users/clicktoearn');
            setMoneyEarned(response.data.moneyEarned);
            await getTotalEarnings();
        } catch (error: any) {
            toast.error("Error during click-to-earn. Please try again.");
        }
    };

    const getTotalEarnings = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/users/profile');
            if (response.data && response.data.data && response.data.data.moneyEarned) {
                await setTotal(response.data.data.moneyEarned);
            } else {
                setTotal(0);
            }
        } catch (error) {
            toast.error("Please login first!");
            setTotal(0);
            setTimeout(() => {
                router.push('/login');
            }, 5000);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getTotalEarnings();
    }, []);

    useEffect(() => {
        if (total !== null) {
            gsap.fromTo(
                ".earnings-number",
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }
            );
        }
    }, [total]);

    return (
        <div className={`relative flex flex-col items-center justify-center min-h-screen`}>
            <div className={`absolute inset-0 bg-earn bg-cover bg-center bg-fixed opacity-55 -z-20`}></div>
            <div className={`flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500 shadow-2xl rounded-lg p-6 max-w-lg mx-auto ${roboto.className}`}>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin border-t-4 border-white w-10 h-10 rounded-full"></div>
                        <p className="ml-4 text-white">Fetching User Earnings...</p>
                    </div>
                ) : (
                    <div className="text-center flex flex-col gap-y-5 w-[40rem] text-white">
                        <h2 className={`${poppins.className} text-3xl tracking-wider font-normal`}>User Earnings</h2>
                        {total !== null ? (
                            <p className="earnings-number text-3xl font-normal">₹ {total.toLocaleString()}</p>
                        ) : (
                            <p className="text-lg">No earnings data available. <br /> Please make sure you are logged in.</p>
                        )}
                    </div>
                )}
            </div>
            <div className={`text-center mt-28 max-w-fit mx-auto px-5 py-2 text-lg tracking-wide`}>
                <button onClick={clicktoearn} className="relative rounded-full px-5 py-2.5 overflow-hidden group bg-red-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative">Click To Earn</span>
                </button>
            </div>
        </div>
    );
};

export default Earn;
