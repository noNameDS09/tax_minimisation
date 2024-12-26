import { connect } from "@/dbconfig/dbConfig";
import RealEstate from "@/models/realestateModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import calculateTax from "@/utils/taxCalculator";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { realEstateName, quantity, price } = reqBody;
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
        user.moneyEarned -= totalCost;
        if(user.taxPaid === null || user.taxPaid === undefined){
            user.taxPaid = 0;
        }
        user.taxPaid += Tax;
        await user.save();

        let existingRealEstate = await RealEstate.findOne({ _id: userId });

        if (existingRealEstate) {
            const stockIndex = existingRealEstate.realestates.findIndex(
                (stock:any) => stock.realEstateName === realEstateName
            );

            if (stockIndex !== -1) {
                existingRealEstate.realestates[stockIndex].quantity += quantity;
                existingRealEstate.realestates[stockIndex].buyPrice = price;
                existingRealEstate.realestates[stockIndex].buyDate = new Date();
            } else {
                existingRealEstate.realestates.push({
                    realEstateName,
                    quantity,
                    buyPrice: price,
                    buyDate: new Date(),
                });
            }

            await existingRealEstate.save();
        } else {
            const newStock = new RealEstate({
                _id: userId,
                realestates: [
                    {
                        realEstateName: realEstateName,
                        quantity: quantity,
                        buyPrice: price,
                        buyDate: new Date(),
                    },
                ],
            });

            await newStock.save();
        }

        return NextResponse.json({
            message: "Real Estate purchased successfully",
            success: true,
            stock: {
                realEstateName: realEstateName,
                quantity,
                buyPrice: price,
                buyDate: new Date(),
            },
        });
    } catch (error: any) {
        console.error("Error during real estate purchase:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
