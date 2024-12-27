'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post('/api/users/logout');

        if (response.data.success) {
          // window.location.reload();
          toast.success('You have successfully logged out!');
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        }
      } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Logout failed. Please try again.');
      }
    };

    logout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl font-semibold mb-6">Logging you out...</h1>
      <p>Please wait while we log you out...</p>
    </div>
  );
};

export default LogoutPage;
