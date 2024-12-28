'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Vehicle {
  _id: string;
  vehicleName: string;
  quantity: number;
  buyRate: number;
  buyDate: string;
  sellRate: number | null;
  sellPrice: number | null;
  sellDate: string | null;
}

const SellVehicle = () => {
  const router = useRouter();
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [buyRate, setBuyRate] = useState<number | null>(null);
  const [sellQuantity, setSellQuantity] = useState<number | null>(null);
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch('/api/users/portfolio');
        const data = await response.json();
        if (data.vehicleData) {
          setVehicleData(data.vehicleData[0]?.vehicles || []);
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleId = event.target.value;
    const vehicle = vehicleData.find(vehicle => vehicle._id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setQuantity(vehicle.quantity);
      setBuyRate(vehicle.buyRate);
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

  const handleSellVehicle = async () => {
    if (selectedVehicle && sellQuantity && sellQuantity <= selectedVehicle.quantity && currentRate) {
      try {
        const response = await axios.post('/api/users/sellvehicle', {
          vehicleName: selectedVehicle.vehicleName,
          quantity: sellQuantity,
          currentRate: currentRate,
          buyingRate: selectedVehicle.buyRate,
        });

        if (response.data.success) {
          setSuccessMessage(response.data.message);
          setErrorMessage(null);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error: any) {
        setErrorMessage(error.response?.data?.error || "Error selling vehicle");
        setSuccessMessage(null);
      }
    } else {
      setErrorMessage("Invalid sell quantity or missing current rate");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center leading-tight">Vehicle Portfolio</h2>

      <div className="mb-6">
        <label htmlFor="vehicle-select" className="block text-lg font-medium text-gray-800">Select Vehicle:</label>
        <select
          id="vehicle-select"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          onChange={handleVehicleChange}
        >
          <option value="">-- Select Vehicle --</option>
          {vehicleData.map(vehicle => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.vehicleName}
            </option>
          ))}
        </select>
      </div>

      {selectedVehicle ? (
        <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vehicle Details</h3>
          <p className="text-lg text-gray-700 mb-2"><span className="font-medium">Vehicle Name:</span> {selectedVehicle.vehicleName}</p>
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
              onClick={handleSellVehicle}
              className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sell Vehicle
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-gray-600 text-lg">Please select a vehicle to view the details.</p>
      )}

      {vehicleData.length === 0 && (
        <p className="mt-6 text-gray-600 text-lg">No vehicles available in your portfolio.</p>
      )}

      {errorMessage && <p className="mt-4 text-red-600 text-lg">{errorMessage}</p>}
      {successMessage && <p className="mt-4 text-green-600 text-lg">{successMessage}</p>}
    </div>
  );
};

export default SellVehicle;
