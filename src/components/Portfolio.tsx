'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Roboto, Poppins } from "next/font/google";

const roboto = Roboto({
    weight: '500',
    style: 'normal',
    subsets: ['latin']
});
const poppins = Poppins({
    weight: ['300', '400'],
    style: 'normal',
    subsets: ['latin']
});

const Portfolio = () => {
    const [stockData, setStockData] = useState<any>(undefined);
    const [vehicleData, setVehicleData] = useState<any>(undefined);
    const [realEstateData, setRealEstateData] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllData = async () => {
            try {
                const response = await axios.get('/api/users/portfolio');
                setStockData(response.data.stockData[0].stocks);
                setVehicleData(response.data.vehicleData[0].vehicles);
                setRealEstateData(response.data.realEstateData[0].realestates);
            } catch (error: any) {
                toast.error('Failed to fetch portfolio details');
            } finally {
                setLoading(false);
            }
        }
        getAllData();
    }, []);

    if (loading) {
        return <div className={`${roboto.className}`}>Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-1">
            <h1 className={`${poppins.className} text-4xl font-semibold text-center text-gray-800 mb-2 mt-32 tracking-wide`}>
                User Portfolio
            </h1>
            <hr className={`border-blue-300`}/>
            <div className="p-6 bg-[#f0eff5] flex flex-wrap justify-center items-center md:flex-col">
                <div className={`flex flex-col sm:flex-col lg:flex-row gap-x-10 justify-center items-start text-center`}>
                    <div className="mb-12">
                        <h2 className={`${roboto.className} text-2xl font-semibold text-gray-800 tracking-normal mb-6`}>Stocks</h2>
                        {stockData && stockData.length > 0 ? (
                            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[#d1cfd1] text-gray-700">
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Stock Symbol</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Quantity</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Buy Rate</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Buy Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {stockData.map((stock: any) => (
                                        <tr key={stock._id} className="hover:bg-gray-50 transition duration-200">
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{stock.stockSymbol}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{stock.quantity}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{stock.buyRate}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{new Date(stock.buyDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={`${roboto.className} text-gray-700`}>No stocks available.</p>
                        )}
                    </div>
                    <div className="mb-12">
                        <h2 className={`${roboto.className} text-2xl font-semibold text-gray-800 tracking-normal mb-6`}>Vehicles</h2>
                        {vehicleData && vehicleData.length > 0 ? (
                            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[#d1cfd1] text-gray-700">
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Vehicle Name</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Quantity</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Buy Price</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Buy Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {vehicleData.map((vehicle: any) => (
                                        <tr key={vehicle._id} className="hover:bg-gray-50 transition duration-200">
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{vehicle.vehicleName}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{vehicle.quantity}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{vehicle.buyPrice}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{new Date(vehicle.buyDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={`${roboto.className} text-gray-700`}>No vehicles available.</p>
                        )}
                    </div>
                </div>
                <div className={`flex gap-x-10 justify-center items-center text-center`}>
                    <div className="mb-12">
                        <h2 className={`${roboto.className} text-2xl font-semibold text-gray-800 tracking-normal mb-6`}>Real Estate</h2>
                        {realEstateData && realEstateData.length > 0 ? (
                            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-[#d1cfd1] text-gray-700">
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Real Estate Name</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Quantity</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Buy Price</th>
                                        <th className={`${roboto.className} px-6 py-3 border-b text-left text-md font-medium`}>Buy Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {realEstateData.map((realEstate: any) => (
                                        <tr key={realEstate._id} className="hover:bg-gray-50 transition duration-200">
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{realEstate.realEstateName}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{realEstate.quantity}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{realEstate.buyPrice}</td>
                                            <td className={`${roboto.className} px-6 py-4 border-b text-md text-gray-700`}>{new Date(realEstate.buyDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={`${roboto.className} text-gray-700`}>No real estate available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
