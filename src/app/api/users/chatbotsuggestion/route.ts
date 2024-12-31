import Transaction from "@/models/transactionModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const transactionDoc = await Transaction.findOne({ _id: userId })
            .select("-_id")
            .sort({ createdAt: -1 })
            .limit(1); // Get the most recent document

        if (
            !transactionDoc ||
            !transactionDoc.transactions ||
            transactionDoc.transactions.length === 0
        ) {
            return NextResponse.json({ message: "No transactions found." });
        }

        const recentTransactions = transactionDoc.transactions.slice(-5);
        // console.log(recentTransactions)
        let transactionString = "From the following transaction give me suggestions for future investments:  Tax is calculated by a function. For buying Stocks and Vehicles : 0.5% and to buy real estate:10% . For selling on profit 12% if loss no tax on stocks and vehicle , 18% tax on profit on selling real estate.Also Give the analysis on it in bullet points and help to minimise the tax. Make heading Bold and add spacing between two sub headings if possible. These are Indian rupees (₹) \n";

        recentTransactions.forEach((transaction:any, index:any) => {
            transactionString += `\nTransaction ${index + 1}:\n`;
            transactionString += `Asset Type: ${
                transaction.assetType || "Not Available"
            }\n`;

            if (transaction.assetType === "stock") {
                transactionString += `Stock Symbol: ${
                    transaction.assetDetails?.stockSymbol || "Not Available"
                }\n`;
            } else if (transaction.assetType === "vehicle") {
                transactionString += `Vehicle Name: ${
                    transaction.assetDetails?.vehicleName || "Not Available"
                }\n`;
            } else if (transaction.assetType === "realEstate") {
                transactionString += `Real Estate Name: ${
                    transaction.assetDetails?.realEstateName || "Not Available"
                }\n`;
            }

            if (transaction.buyPrice)
                transactionString += `Buy Price: ${transaction.buyPrice}\n`;
            if (transaction.buyQuantity)
                transactionString += `Buy Quantity: ${transaction.buyQuantity}\n`;
            if (transaction.buyDate)
                transactionString += `Buy Date: ${new Date(
                    transaction.buyDate
                ).toLocaleDateString()}\n`;

            if (transaction.sellPrice)
                transactionString += `Sell Price: ${transaction.sellPrice}\n`;
            if (transaction.sellQuantity)
                transactionString += `Sell Quantity: ${transaction.sellQuantity}\n`;
            if (transaction.sellDate)
                transactionString += `Sell Date: ${new Date(
                    transaction.sellDate
                ).toLocaleDateString()}\n`;

            if (transaction.taxPaid)
                transactionString += `Tax Paid: ${transaction.taxPaid}\n`;
        });
        const userTax = await User.findOne({_id: userId}).select("taxPaid -_id");
        transactionString += `\nTotal tax paid ${userTax}`;

        const chatbotResponse = await axios.post(
            "http://localhost:3000/api/users/chatbot",
                {prompt: transactionString,}
            
        );
        // console.log(transactionString)
        return NextResponse.json(
            {
                message: chatbotResponse.data.output,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
