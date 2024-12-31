import { connect } from "@/dbconfig/dbConfig";
import Stock from "@/models/stockModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { logTransaction } from "@/utils/logTransaction";
import { calculateTax } from "@/utils/taxCalculator";
import axios from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { stockSymbol, quantity, rate } = reqBody;
        const tax: number = parseFloat(calculateTax(quantity * rate, 0.005).toFixed(2));
        const totalCost: number = quantity * rate + tax;
        const userId = await getDataFromToken(request);
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json(
                { message: "Invalid user ID" },
                { status: 400 }
            );
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (typeof user.salary !== "number" || isNaN(user.salary)) {
            return NextResponse.json(
                { error: "Invalid salary value" },
                { status: 400 }
            );
        }

        if (user.salary < totalCost) {
            return NextResponse.json(
                { error: "Insufficient funds" },
                { status: 400 }
            );
        }
        user.salary -= totalCost;
        user.taxPaid =
            typeof user.taxPaid === "number" && !isNaN(user.taxPaid)
                ? user.taxPaid
                : 0;
        user.taxPaid += tax;

        await user.save();

        let existingStock = await Stock.findOne({ _id: userId });

        if (existingStock) {
            existingStock.stocks.push({
                stockSymbol,
                quantity,
                buyRate: rate,
                buyPrice: totalCost,
                buyDate: new Date(),
            });
            existingStock.taxPaid += tax;

            await existingStock.save();
        } else {
            const newStock = new Stock({
                _id: userId,
                stocks: [
                    {
                        stockSymbol: stockSymbol,
                        quantity: quantity,
                        buyRate: rate,
                        buyPrice: totalCost,
                        buyDate: new Date(),
                        taxPaid: tax,
                    },
                ],
            });

            await newStock.save();
        }
        const assetDetails = {
            stockSymbol: stockSymbol,
        };
        // for transaction history
        await logTransaction(
            userId,
            "stock",
            assetDetails,
            totalCost,
            quantity
        );

        return NextResponse.json({
            message: "Stock purchased successfully",
            success: true,
            stock: {
                stockSymbol: stockSymbol,
                quantity,
                buyPrice: totalCost,
                buyDate: new Date(),
            },
        });
    } catch (error: any) {
        console.error("Error during stock purchase:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
