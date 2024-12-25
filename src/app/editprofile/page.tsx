'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditProfile = () => {
    const [profile, setProfile] = useState({
        job: '',
        salary: 0,
        moneyEarned: 0,
        taxPaid: 0
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/users/profile');
                setProfile(response.data.profile);
            } catch (error) {
                console.error('Failed to fetch profile', error);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/users/editprofile', {
                userJob: profile.job,
                userSalary: profile.salary,
                userMoneyEarned: profile.moneyEarned,
                userTaxPaid: profile.taxPaid
            });

            toast.success(response.data.message);
            router.push('/profile');
        } catch (error) {
            console.error('Error updating profile', error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !error) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Edit Profile</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="job" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            id="job"
                            name="job"
                            type="text"
                            value={profile?.job || ''}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your job title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                        <input
                            id="salary"
                            name="salary"
                            type="number"
                            value={profile?.salary || 0}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your salary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="moneyEarned" className="block text-sm font-medium text-gray-700">Money Earned</label>
                        <input
                            id="moneyEarned"
                            name="moneyEarned"
                            type="number"
                            value={profile?.moneyEarned || 0}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your money earned"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="taxPaid" className="block text-sm font-medium text-gray-700">Tax Paid</label>
                        <input
                            id="taxPaid"
                            name="taxPaid"
                            type="number"
                            value={profile?.taxPaid || 0}
                            onChange={handleChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter tax paid"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 mt-6 text-white font-medium rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'}`}
                    >
                        {loading ? "Processing..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
