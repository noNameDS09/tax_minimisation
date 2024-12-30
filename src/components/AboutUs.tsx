'use client'

const AboutUs = () => {

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 selection:bg-sky-500/70">
            <div className="max-w-7xl mx-auto flex justify-center items-center gap-x-5">
                <div className={`w-[70%] p-10 bg-[#8cebf750] rounded-3xl`}>
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            About TaxWise
                        </h2>
                        <span className="mt-4 text-lg text-gray-700">
                            <ul className="list-disc pl-5 mt-5">
                                <li>TaxWise is an advanced AI-powered financial assistant designed to help individuals take control of their financial future.</li>
                                <li>It offers a blend of real-time money management tools, personalized tax-saving strategies, and educational resources on financial literacy.</li>
                                <li>TaxWise helps users make informed, data-driven decisions about their finances.</li>
                                <li>Whether you're managing daily expenses, planning for future investments, or navigating the complexities of tax decisions, TaxWise provides the insights and support needed to optimize your financial situation.</li>
                                <li>The platform features a user-friendly interface and real-time updates, making managing your money more accessible and effective than ever before.</li>
                            </ul>
                        </span>
                    </div>

                    {/* Empowering the Community Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Empowering the Community
                        </h2>
                        <span className="mt-4 text-lg text-gray-700">
                            <ul className="list-disc pl-5 mt-5">
                                <li>At TaxWise, we believe that financial empowerment starts with knowledge and informed decision-making.</li>
                                <li>Our goal is to create a community where individuals feel confident in managing their finances, understanding their tax obligations, and making smart investment choices.</li>
                                <li>We provide easy-to-understand reports, interactive learning resources, and personalized guidance.</li>
                                <li>Our mission is to equip users with the tools they need to manage their money better.</li>
                                <li>With a focus on financial literacy and accessibility, TaxWise helps people from all walks of life take charge of their financial future.</li>
                                <li>We strive to foster a community where everyone can make informed decisions that lead to long-term financial success.</li>
                            </ul>
                        </span>
                    </div>
                </div>
                <div className="bg-sky-100 p-10 rounded-xl w-[40%] hidden lg:block">
                    <img src="/assets/invest1.avif" className="rounded-2xl" />
                </div>
            </div>
        </section>

    );
};

export default AboutUs;
