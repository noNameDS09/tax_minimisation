'use client'
import { useEffect, useState } from "react";
import TransactionHistory from "./TransactionHistory";
import ChatBotSuggestion from "./ChatBotSuggestion";
interface TaxData {
  message: string;
  userTax: number;
  stockTax: number;
  vehicleTax: number;
  realEstateTax: number;
}

const TaxReport = () => {
  const [taxData, setTaxData] = useState<TaxData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const response = await fetch("/api/users/gettaxreport");
        const data: TaxData = await response.json();

        if (response.ok) {
          setTaxData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch tax data");
      } finally {
        setLoading(false);
      }
    };

    fetchTaxData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mt-40">
        <div className="bg-white p-8 rounded-lg w-full sm:w-96 hover:shadow-md hover:shadow-zinc-800 transition-shadow duration-300">
          <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            Tax Overview
          </h1>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin border-t-4 border-blue-600 w-12 h-12 rounded-full"></div>
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : (
            <div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">User Tax:</span>
                  <span className="text-gray-600">{taxData?.userTax || 0} RS</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Stock Tax:</span>
                  <span className="text-gray-600">{taxData?.stockTax || 0} RS</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Vehicle Tax:</span>
                  <span className="text-gray-600">{taxData?.vehicleTax || 0} RS</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Real Estate Tax:</span>
                  <span className="text-gray-600">{taxData?.realEstateTax || 0} RS</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {
          (taxData?.userTax > 0) ? (
            <div className="flex justify-center items-center">
              <div>
                <TransactionHistory />
              </div>
              <div>
                <ChatBotSuggestion />
              </div>
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    </>
  );
};

export default TaxReport;