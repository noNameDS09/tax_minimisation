import { connect } from "@/dbconfig/dbConfig";
import RealEstate from "@/models/realestateModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import {calculateTax} from "@/utils/taxCalculator";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { realEstateName, quantity, rate } = reqBody;

        const tax = calculateTax(quantity * rate, 10);
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

        if (user.moneyEarned < totalCost) {
            return NextResponse.json(
                { error: "Insufficient funds" },
                { status: 400 }
            );
        }

        user.moneyEarned -= totalCost;
        user.taxPaid = user.taxPaid || 0;
        user.taxPaid += tax;
        await user.save();

        let existingRealEstate = await RealEstate.findOne({ _id: userId });

        if (existingRealEstate) {
            const realEstateExists = existingRealEstate.realestates.some(
                (realEstate:any) => realEstate.realEstateName === realEstateName
            );

            if (realEstateExists) {
                return NextResponse.json({
                    message: "Real Estate already present.",
                    success: false,
                }, { status: 400 });
            }

            existingRealEstate.realestates.push({
                realEstateName,
                quantity,
                buyRate: rate,
                buyPrice: totalCost,
                buyDate: new Date(),
            });
            existingRealEstate.taxPaid += tax

            await existingRealEstate.save();
        } else {
            const newRealEstate = new RealEstate({
                _id: userId,
                realestates: [
                    {
                        realEstateName,
                        quantity,
                        buyRate: rate,
                        buyPrice: totalCost,
                        buyDate: new Date(),
                    },
                ],
                taxPaid: tax,
            });

            await newRealEstate.save();
        }

        return NextResponse.json({
            message: "Real Estate purchased successfully",
            success: true,
            realEstate: {
                realEstateName,
                quantity,
                buyPrice: totalCost,
                buyDate: new Date(),
            },
        });
    } catch (error: any) {
        console.error("Error during real estate purchase:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
