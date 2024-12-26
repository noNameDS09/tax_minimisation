import { connect } from "@/dbconfig/dbConfig";
import Stock from "@/models/stockModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import calculateTax from "@/utils/taxCalculator";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { stockSymbol, quantity, price } = reqBody;
        const tax = calculateTax(quantity * price);
        const totalCost = quantity * price + tax;
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

        if (user.moneyEarned < totalCost) {
            return NextResponse.json(
                { error: "Insufficient funds" },
                { status: 400 }
            );
        }

        const Tax = totalCost - (quantity * price);
        console.log(typeof(Tax))
        user.moneyEarned -= totalCost;
        if(user.taxPaid === null || user.taxPaid === undefined){
            user.taxPaid = 0;
        }
        user.taxPaid += Tax;
        await user.save();

        let existingStock = await Stock.findOne({ _id: userId });

        if (existingStock) {
            const stockIndex = existingStock.stocks.findIndex(
                (stock: any) => stock.stockSymbol === stockSymbol
            );

            if (stockIndex !== -1) {
                existingStock.stocks[stockIndex].quantity += quantity;
                existingStock.stocks[stockIndex].buyPrice = price;
                existingStock.stocks[stockIndex].buyDate = new Date();
            } else {
                existingStock.stocks.push({
                    stockSymbol,
                    quantity,
                    buyPrice: price,
                    buyDate: new Date(),
                });
            }

            await existingStock.save();
        } else {
            const newStock = new Stock({
                _id: userId,
                stocks: [
                    {
                        stockSymbol: stockSymbol,
                        quantity: quantity,
                        buyPrice: price,
                        buyDate: new Date(),
                    },
                ],
            });

            await newStock.save();
        }

        return NextResponse.json({
            message: "Stock purchased successfully",
            success: true,
            stock: {
                stockSymbol: stockSymbol,
                quantity,
                buyPrice: price,
                buyDate: new Date(),
            },
        });
    } catch (error: any) {
        console.error("Error during stock purchase:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
