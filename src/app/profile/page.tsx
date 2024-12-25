"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
                console.log(error.message);
                toast.error('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };
        getUserDetails();

    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 px-5">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Profile</h1>
                <hr className="my-4 border-gray-300" />

                <p className="text-center text-gray-600 mb-6">Manage your profile information below</p>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className="text-center text-gray-600">No username available</p>
                            ) : (
                                <p className="text-center text-gray-800 font-semibold">{data.username}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className="text-center text-gray-600">No email available</p>
                            ) : (
                                <p className="text-center text-gray-800 font-semibold">{data.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Job</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className="text-center text-gray-600">No job available</p>
                            ) : (
                                <p className="text-center text-gray-800 font-semibold">{data.job}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Salary</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className="text-center text-gray-600">No salary available</p>
                            ) : (
                                <p className="text-center text-gray-800 font-semibold">${data.salary}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Money Earned</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className="text-center text-gray-600">No money earned available</p>
                            ) : (
                                <p className="text-center text-gray-800 font-semibold">${data.moneyEarned}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Tax Paid</label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            {data === null ? (
                                <p className="text-center text-gray-600">No tax paid available</p>
                            ) : (
                                <p className="text-center text-gray-800 font-semibold">${data.taxPaid}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-6">
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                <div className="text-center mt-6">
                    <Link href="/editprofile" className="text-sm text-blue-600 hover:underline">Edit Profile</Link>
                </div>
            </div>
        </div>
    );
}
