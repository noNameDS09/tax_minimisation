'use client';
import React, { useEffect, useState } from 'react';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);  // Track current page
    const transactionsPerPage = 5;

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

    if (!transactions || transactions === undefined || transactions.transactions.length === 0) {
        return <div>No transactions found for this user.</div>;
    }

    const reversedTransactions = [...transactions.transactions].reverse();

    const indexOfLastTransaction = page * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = reversedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const nextPage = () => {
        if (page < Math.ceil(transactions.transactions.length / transactionsPerPage)) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="flex flex-col text-center max-w-4xl md:w-[40rem] mx-auto p-6 space-y-6 mt-20">
            <h2 className="text-3xl font-semibold text-gray-900">Your Transactions</h2>

            {currentTransactions.map((transaction: any) => (
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
                                <strong>Remaining Quantity:</strong> {transaction.remainingQuantity}
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

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={prevPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-lg">Page {page}</span>
                <button
                    onClick={nextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                    disabled={page >= Math.ceil(transactions.transactions.length / transactionsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionHistory;