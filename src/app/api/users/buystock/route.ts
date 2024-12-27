import { connect } from "@/dbconfig/dbConfig";
import Stock from "@/models/stockModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { calculateTax } from "@/utils/taxCalculator";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { stockSymbol, quantity, rate } = reqBody;
        const tax = calculateTax(quantity * rate, 0.5);
        console.log(stockSymbol)
        console.log(quantity)
        console.log(rate)
        const totalCost = quantity * rate + tax;
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

        if (typeof user.moneyEarned !== 'number' || isNaN(user.moneyEarned)) {
            return NextResponse.json(
                { error: "Invalid moneyEarned value" },
                { status: 400 }
            );
        }

        if (user.moneyEarned < totalCost) {
            return NextResponse.json(
                { error: "Insufficient funds" },
                { status: 400 }
            );
        }
        console.log(user.taxPaid)
        user.moneyEarned -= totalCost;
        console.log(`here1`)
        user.taxPaid = (typeof user.taxPaid === 'number' && !isNaN(user.taxPaid)) ? user.taxPaid : 0;
        user.taxPaid += tax;
        console.log(`here2`)
        console.log(tax)
        
        await user.save();
        console.log(`here3`)
        
        let existingStock = await Stock.findOne({ _id: userId });
        console.log(`here4`)
        
        if (existingStock) {
            console.log(`here5`)
            existingStock.stocks.push({
                stockSymbol,
                quantity,
                buyRate: rate,
                buyPrice: totalCost,
                buyDate: new Date(),
            });
            existingStock.taxPaid += tax;
            console.log(`here6`)
            
            await existingStock.save();
        } else {
            console.log(`here7`)
            const newStock = new Stock({
                _id: userId,
                stocks: [
                    {
                        stockSymbol: stockSymbol,
                        quantity: quantity,
                        buyRate: rate,
                        buyPrice: totalCost,
                        buyDate: new Date(),
                    },
                ],
                taxPaid: tax,
            });

            await newStock.save();
        }

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
