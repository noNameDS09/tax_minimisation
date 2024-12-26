"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Roboto, Poppins } from "next/font/google";

const roboto = Roboto({
    weight: ['400', '500'],
    style: 'normal',
    subsets: ['latin']
});
const poppins = Poppins({
    weight: ['400', '500'],
    style: 'normal',
    subsets: ['latin']
});

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            await axios.post('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/users/profile');
                setData(res.data.data);
            } catch (error: any) {
                // console.log(error.message);
                toast.error('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };
        getUserDetails();

    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0eff5] py-10 px-5">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3 xl:w-1/2">
                <h1 className={`${roboto.className} tracking-wider text-3xl text-center text-gray-800 mb-6`}>Profile</h1>
                <hr className="my-4 border-gray-400" />

                {data === null ? (
                    <p className="text-center text-gray-600 mb-6">Fetching details...</p>
                ) : (
                    <p className={`${roboto.className} font-medium text-lg tracking-wide text-center text-gray-600 mb-6`}>Manage your profile information below</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                        <label className={`${poppins.className} text-base font-normal text-gray-700`}>Username</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className={`text-center text-gray-600`}>No username available</p>
                            ) : (
                                <p className={`${roboto.className} font-medium text-lg text-center text-gray-800`}>{data.username}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className={`${poppins.className} text-base font-normal text-gray-700`}>Email</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className={`text-center text-gray-600`}>No email available</p>
                            ) : (
                                <p className={`${roboto.className} font-medium text-lg text-center text-gray-800`}>{data.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className={`${poppins.className} text-base font-normal text-gray-700`}>Job</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className={`text-center text-gray-600`}>No job available</p>
                            ) : (
                                <p className={`${roboto.className} font-medium text-lg text-center text-gray-800`}>{data.job || 'Not Available'}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className={`${poppins.className} text-base font-normal text-gray-700`}>Salary</label>
                        <div className="bg-green-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className={`text-center text-gray-600`}>No salary available</p>
                            ) : (
                                <p className={`${roboto.className} font-medium text-lg text-center text-green-800`}>Rs {data.salary || 0}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className={`${poppins.className} text-base font-normal text-gray-700`}>Money Earned</label>
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className={`text-center text-gray-600`}>No money earned available</p>
                            ) : (
                                <p className={`${roboto.className} font-medium text-lg text-center text-yellow-800`}>Rs {data.moneyEarned || 0}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className={`${poppins.className} text-base font-normal text-gray-700`}>Tax Paid</label>
                        <div className="bg-red-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className={`text-center text-gray-600`}>No tax paid available</p>
                            ) : (
                                <p className={`${roboto.className} font-medium text-lg text-center text-red-800`}>Rs {data.taxPaid || 0}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-8">
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                <div className="text-center mt-6">
                    <Link href="/editprofile" className="text-base tracking-wider text-blue-600 transition hover:duration-200 hover:underline">Edit Profile</Link>
                </div>
            </div>
        </div>
    );
}
