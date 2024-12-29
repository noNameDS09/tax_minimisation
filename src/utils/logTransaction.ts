import Transaction from "@/models/transactionModel";
import { NextResponse } from "next/server";

export async function logTransaction(userId: string, assetType: string, assetDetails: any, buyPrice: number, buyQuantity: number) {
    try {
        const user = await Transaction.findOne({ _id: userId });

        const transaction = {
            assetType: assetType,
            assetDetails: assetDetails,
            buyPrice: buyPrice,
            buyQuantity: buyQuantity,
            buyDate: new Date(),
            sellPrice: null,
            sellQuantity: null,
            sellDate: null,
            taxPaid: 0,
        };

        if (!user) {
            const newUser = new Transaction({
                _id: userId,
                transactions: [transaction],
                taxPaid: 0,
            });
            await newUser.save();
            return NextResponse.json({ data: newUser });
        } else {
            if (!user.transactions) {
                user.transactions = [];
            }

            user.transactions.push(transaction);
            await user.save();
            return NextResponse.json({ data: user });
        }

    } catch (err: any) {
        console.error("Error logging transaction:", err);
        throw new Error("Transaction logging failed");
    }
}