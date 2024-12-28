'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RealEstate {
  _id: string;
  realEstateName: string;
  quantity: number;
  buyRate: number;
  buyDate: string;
  sellRate: number | null;
  sellPrice: number | null;
  sellDate: string | null;
}

const SellRealEstate = () => {
  const router = useRouter();
  const [realEstateData, setRealEstateData] = useState<RealEstate[]>([]);
  const [selectedRealEstate, setSelectedRealEstate] = useState<RealEstate | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [buyRate, setBuyRate] = useState<number | null>(null);
  const [sellQuantity, setSellQuantity] = useState<number | null>(null);
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchrealEstateData = async () => {
      try {
        const response = await fetch('/api/users/portfolio');
        const data = await response.json();
        if (data.realEstateData) {
          setRealEstateData(data.realEstateData[0]?.realestates || []);
        }
      } catch (error) {
        console.error("Error fetching real estate data:", error);
      }
    };

    fetchrealEstateData();
  }, []);

  const handleRealEstateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const realEstateId = event.target.value;
    const realEstate = realEstateData.find(realEstate => realEstate._id === realEstateId);
    if (realEstate) {
      setSelectedRealEstate(realEstate);
      setQuantity(realEstate.quantity);
      setBuyRate(realEstate.buyRate);
    }
  };

  const handleSellQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setSellQuantity(value);
  };

  const handleCurrentRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setCurrentRate(value);
  };

  const handleSellRealEstate = async () => {
    if (selectedRealEstate && sellQuantity && sellQuantity <= selectedRealEstate.quantity && currentRate) {
      try {
        const response = await axios.post('/api/users/sellrealestate', {
          realEstateName: selectedRealEstate.realEstateName,
          quantity: sellQuantity,
          currentRate: currentRate,
          buyingRate: selectedRealEstate.buyRate,
        });

        if (response.data.success) {
          setSuccessMessage(response.data.message);
          setErrorMessage(null);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error: any) {
        setErrorMessage(error.response?.data?.error || "Error selling real estate");
        setSuccessMessage(null);
      }
    } else {
      setErrorMessage("Invalid sell quantity or missing current rate");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center leading-tight">Real Estate Portfolio</h2>

      <div className="mb-6">
        <label htmlFor="stock-select" className="block text-lg font-medium text-gray-800">Select Real Estate:</label>
        <select
          id="realestate-select"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          onChange={handleRealEstateChange}
        >
          <option value="">-- Select Real Estate --</option>
          {realEstateData.map(realestate => (
            <option key={realestate._id} value={realestate._id}>
              {realestate.realEstateName}
            </option>
          ))}
        </select>
      </div>

      {selectedRealEstate ? (
        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real Estate Details</h3>
          <p className="text-lg text-gray-700 mb-2"><span className="font-medium">Real Estate Name:</span> {selectedRealEstate.realEstateName}</p>
          <p className="text-lg text-gray-700 mb-2"><span className="font-medium">Quantity:</span> {quantity}</p>
          <p className="text-lg text-gray-700 mb-6"><span className="font-medium">Buy Rate:</span> Rs {buyRate}</p>

          <div className="mt-6">
            <label htmlFor="sell-quantity" className="block text-lg font-medium text-gray-800 mb-2">Sell Quantity:</label>
            <input
              id="sell-quantity"
              type="number"
              value={sellQuantity ?? ''}
              onChange={handleSellQuantityChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter quantity to sell"
              min="1"
              max={quantity ?? 0}
            />

            <label htmlFor="current-rate" className="block text-lg font-medium text-gray-800 mt-4 mb-2">Current Rate:</label>
            <input
              id="current-rate"
              type="number"
              value={currentRate ?? ''}
              onChange={handleCurrentRateChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter current sell rate"
              min="0"
            />

            <button
              onClick={handleSellRealEstate}
              className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sell Real Estate
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-gray-600 text-lg">Please select a real estate to view the details.</p>
      )}

      {realEstateData.length === 0 && (
        <p className="mt-6 text-gray-600 text-lg">No real estate available in your portfolio.</p>
      )}

      {errorMessage && <p className="mt-4 text-red-600 text-lg">{errorMessage}</p>}
      {successMessage && <p className="mt-4 text-green-600 text-lg">{successMessage}</p>}
    </div>
  );
};

export default SellRealEstate;
