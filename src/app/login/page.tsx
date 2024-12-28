'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            // Success response, show success toast
            toast.success("Login success");
            window.location.reload();
            setTimeout(() => {
                router.push("/");
            }, 10000);
        } catch (error: any) {
            // Handle error from backend
            if (error.response) {
                // const errorMessage = error.response.data.error || error.message;
                // alert(errorMessage);
                setError(true);
            } else {
                alert("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                {loading ? "Processing..." : "Login"}
            </h1>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder={`Enter your email`}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {
                    error ? (
                        <div className={`text-red-600 text-center mt-3 text-sm`}>
                            {error ? "Invalid Credentials. Make sure you are registered" : ""}
                        </div>
                    ):(
                        <div className="hidden"></div>
                    )
                }
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={`w-full py-3 mt-6 text-white font-medium rounded-lg ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'}`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin border-t-4 border-white w-8 h-8 rounded-full"></div>
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="mt-4 text-center">
                    <Link href="/signup" className="text-sm text-blue-600 hover:underline">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}
