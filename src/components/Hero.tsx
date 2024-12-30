'use client';

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from "react";

export default function Hero() {
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 1 } });

        timeline.fromTo(
            ".taxwise",
            {
                width: 0,
                opacity: 0,
                ease: "power4.out",
            },
            {
                width: "auto",
                opacity: 1,
                stagger: 0.1,
            }
        );

        timeline.to(".taxwise", {
            glowFilter: { color: "#00f9ff", blur: 10, strength: 3 },
            repeat: -1,
            yoyo: true,
            ease: "none",
        });
    }, []);

    useEffect(() => {
        gsap.to(".this", {
            scrollTrigger: {
                trigger: ".this",
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            },
            opacity: 1,
            rotation: 0,
            duration: 3,
            ease: "none"
        })
    }, [])
    return (
        <div className="mx-auto px-0 py-8 flex flex-col text-gray-900 mt-20 selection:bg-sky-500/70">
            {/* Intro Section */}
            <div className="text-center mb-16 pt-10">
                <h1 className="text-4xl  font-bold text-blue-600 mb-4">
                    Empower Your Financial Journey with <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:rounded-xl before:bg-sky-500 relative inline-block">
                        <span className="taxwise relative text-white">TaxWise</span>
                    </span>
                </h1>
                <p className="text-xl font-roboto text-gray-700 max-w-3xl mx-auto ">
                    TaxWise offers personalized tax-saving strategies and investment advice. <br />Get real-time insights and make smarter financial decisions with ease.
                </p>
            </div>

            {/* Description Section */}
            <div className="flex flex-col md:flex-col lg:flex-row px-20">
                <div>
                    <img
                        alt="finance-animation-explained"
                        src={'/assets/finance-animation-explained.jpg'}
                        className="aspect-auto h-[85%]"
                    />
                </div>
                <div className="mb-16 text-center bg-gradient-to-r from-[#00ccff] via-white  to-green-300 px-1 text-wrap md:px-32 py-8 rounded-b-3xl md:rounded-full lg:rounded-s-3xl w-full">
                    <h2 className="flex flex-row justify-center text-2xl text-center font-semibold text-green-600 mb-6 lg:-ml-24">What is <p className="underline font-semibold ml-2 text-blue-600">TaxWise?</p></h2>
                    <p className="text-lg font-roboto text-gray-700 leading-relaxed lg:-ml-24">
                        TaxWise is an intelligent&nbsp;&nbsp;
                        <span className="bg-yellow-300 rounded-sm p-1 px-0">AI-driven financial assistant  </span> 
                        &nbsp;designed to guide you through the complexities of tax-saving strategies and investment decisions. Whether you're looking to optimize your tax filings, explore tax-deferred accounts, or receive personalized investment recommendations, TaxWise provides 
                        <span className="bg-yellow-300 rounded-sm p-1">real-time insights and expert advice</span> 
                        tailored to your financial goals. With its easy-to-use interface and actionable guidance, TaxWise helps you make smarter, more informed decisions, ensuring you maximize your savings and grow your wealth effectively.
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div className="this opacity-0 flex flex-col justify-center items-center gap-8 w-full mb-16">
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto">
                    <div className="bg-white hover:shadow-lg duration-300 rounded-lg p-6 text-center w-full sm:w-72">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Financial Literacy</h3>
                        <p className="text-lg font-roboto text-gray-700">
                            Learn the basics of personal finance with interactive lessons and tips. Empower yourself with the knowledge to make informed decisions about budgeting, saving, and investing.
                        </p>
                    </div>
                    <div className="bg-white hover:shadow-lg duration-300 rounded-lg p-6 text-center w-full sm:w-72">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Real Life Money Management</h3>
                        <p className="text-lg font-roboto text-gray-700">
                            A comprehensive tool to track, manage, and optimize your finances in real-time. Stay on top of your expenses, income, and savings goals with ease.
                        </p>
                    </div>
                    <div className="bg-white hover:shadow-lg duration-300 rounded-lg p-6 text-center w-full sm:w-72">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Tax Decisions</h3>
                        <p className="text-lg font-roboto text-gray-700">
                            Receive personalized tax-saving strategies and advice to make the right decisions for your financial future. Maximize deductions, reduce liabilities, and plan your taxes smarter.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto">
                    <div className="bg-white hover:shadow-lg duration-300 rounded-lg p-6 text-center w-full sm:w-72">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Financial Report</h3>
                        <p className="text-lg font-roboto text-gray-700">
                            Get detailed, easy-to-understand financial reports that summarize your income, expenses, investments, and savings. Stay informed and make data-driven decisions about your financial health.
                        </p>
                    </div>
                    <div className="bg-white hover:shadow-lg duration-300 rounded-lg p-6 text-center w-full sm:w-72">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Chatbot Assistance</h3>
                        <p className="text-lg font-roboto text-gray-700">
                            Access instant support with our AI-powered chatbot. Get personalized advice on tax-saving strategies, investments, and financial decisions, all through real-time, conversational interactions.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-600 text-white py-16 mt-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Financial Future?</h2>
                <p className="text-lg font-roboto mb-8">Start using TaxWise today and make smarter financial decisions with personalized guidance and insights.</p>
                <a href="/signup" className="bg-yellow-500 text-blue-900 py-3 px-6 rounded-full text-xl hover:bg-yellow-400 transition duration-300">Get Started</a>
            </div>
        </div>
    );
}
