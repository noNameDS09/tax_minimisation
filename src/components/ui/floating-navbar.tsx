"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const roboto = Roboto({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"]
});

export const FloatingNav = ({ navItems, className }: { navItems: { name: string; link: string }[]; className?: string }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [data, setData] = useState<any>(null); // User data
  const [loading, setLoading] = useState(false); // Loading state

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/users/profile');
        setData(res.data); // Store user data
      } catch (error: any) {
        console.log(error.message);
        toast.error('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  const handleButtonClick = () => {
    if (data) {
      window.location.href = '/profile';
    } else {
      // If user is not logged in, go to login page or show login modal
      window.location.href = '/login';
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-full fixed top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-none dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-4 py-4 sm:pl-8 sm:pr-8 items-center justify-between space-x-4",
          className
        )}
      >
        <div>
          <Image src={'/globe.svg'} width={40} height={40} alt="Logo" className={`cursor-pointer`} />
        </div>
        <div className={`flex gap-x-14`}>
          {navItems.map((navItem, idx) => (
            <Link key={`link=${idx}`} href={navItem.link} className={cn("relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-700 dark:hover:text-neutral-300 hover:text-neutral-900 duration-300 font-semibold")}>
              <span className="sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <button
          onClick={handleButtonClick}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full duration-300 hover:bg-blue-500"
        >
          {loading ? (
            <span>Loading...</span> // Show Loading text when data is being fetched
          ) : (
            <span>{data ? "Profile" : "Login"}</span> // Show Profile or Login based on user data
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
