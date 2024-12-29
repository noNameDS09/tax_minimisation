'use client';
import React, { useEffect, useState } from 'react';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/users/transactionhistory');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (!transactions || transactions.transactions.length === 0) {
        return <div>No transactions found for this user.</div>;
    }

    return (
        <div className="flex flex-col text-center max-w-4xl md:w-[40rem] mx-auto p-6 space-y-6 mt-20">
            <h2 className="text-3xl font-semibold text-gray-900">Your Transactions</h2>

            {transactions.transactions.map((transaction: any) => (
                <div
                    key={transaction._id}
                    className="border rounded-lg p-6 shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 hover:shadow-xl transition-shadow duration-300"
                >
                    <h3 className="text-xl font-semibold text-gray-800 w-fit">{transaction.assetType.toUpperCase()}:</h3>

                    <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-8 w-full">
                        <div className="flex flex-col items-start space-y-3">
                            <div className="text-sm text-gray-600">
                                <strong>Buy Price:</strong> ₹ {transaction.buyPrice}
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>Buy Quantity:</strong> {transaction.buyQuantity}
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>Buy Date:</strong> {new Date(transaction.buyDate).toLocaleDateString()}
                            </div>

                            {transaction.assetType === 'stock' && (
                                <div className="text-sm text-gray-600">
                                    <strong>Stock Symbol:</strong> {transaction.assetDetails.stockSymbol}
                                </div>
                            )}

                            {transaction.assetType === 'vehicle' && (
                                <div className="text-sm text-gray-600">
                                    <strong>Vehicle:</strong> {transaction.assetDetails.vehicleName}
                                </div>
                            )}

                            {transaction.assetType === 'realEstate' && (
                                <div className="text-sm text-gray-600">
                                    <strong>Real Estate:</strong> {transaction.assetDetails.realEstateName}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-start space-y-3">
                            <div className="text-sm text-gray-600">
                                <strong>Tax Paid:</strong> ₹ {transaction.taxPaid}
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>Sell Price:</strong> {transaction.sellPrice ? `₹ ${transaction.sellPrice}` : 'Not sold yet'}
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>Sell Quantity:</strong> {transaction.sellQuantity || 'Not sold yet'}
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>Sell Date:</strong> {transaction.sellDate ? new Date(transaction.sellDate).toLocaleDateString() : 'Not sold yet'}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default TransactionHistory;