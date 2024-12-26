'use client';
import React from 'react';
import { Poppins, Roboto, Secular_One } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
    weight: "900",
    style: "normal",
    subsets: ["latin"]
})
const secular_one = Secular_One({
    weight: "400",
    style: "normal",
    subsets: ["latin"]
})


const Hero = () => {
    return (
        <div className={`top-20 relative flex flex-col md:flex-row justify-between w-full`}>
            <div className={`flex flex-col justify-center text-center w-1/2 px-5`}>
                <div className={`mt-10 flex flex-col gap-y-3`}>
                    <h1 className={`${secular_one.className} text-4xl bg-gradient-to-b from-blue-500 to-blue-500 bg-clip-text text-transparent
`}>Intro</h1>
                    <p>
                        Our website helps you understand how your earnings, spending, and investments are taxed. It offers practical solutions to minimize taxes while maximizing your financial potential. Explore different scenarios, make informed choices, and take control of your financial future.
                    </p>
                </div>
                <div className={`mt-10 flex flex-col gap-y-3`}>
                    <h2 className={`${secular_one.className} text-4xl`}>
                        Description
                    </h2>
                    <p>
                        Learn how taxes impact your income, spending, and investments. Discover various tax scenarios and strategies to reduce liabilities. Our platform provides actionable insights to help you optimize your finances by making smarter decisions around earnings, expenditures, and investments.
                    </p>
                </div>
            </div>
            <div className={`pr-10 hidden md:block`}>
                <Image src={'/window.svg'} alt='Our Services' width={500} height={500}/>
            </div>
        </div>
    )
}

export default Hero
