import { connect } from "@/dbconfig/dbConfig";
import Vehicle from "@/models/vehicleModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { calculateTax } from "@/utils/taxCalculator";
import { logTransaction } from "@/utils/logTransaction";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { vehicleName, quantity, rate } = reqBody;
        const tax = parseFloat(calculateTax(quantity * rate, 0.005).toFixed(2));
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

        if (user.salary < totalCost) {
            return NextResponse.json(
                { error: "Insufficient funds" },
                { status: 400 }
            );
        }

        user.salary -= totalCost;
        if (user.taxPaid === null || user.taxPaid === undefined) {
            user.taxPaid = 0;
        }
        user.taxPaid += tax;
        await user.save();

        let existingVehicle = await Vehicle.findOne({ _id: userId });

        if (existingVehicle) {
            existingVehicle.vehicles.push({
                vehicleName,
                quantity,
                buyRate: rate,
                buyPrice: totalCost,
                buyDate: new Date(),
            });
            existingVehicle.taxPaid += tax;

            await existingVehicle.save();
        } else {
            const newStock = new Vehicle({
                _id: userId,
                vehicles: [
                    {
                        vehicleName: vehicleName,
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

        // for transaction history
        const assetDetails = {
            vehicleName: vehicleName,
        };
        
        await logTransaction(
            userId,
            "vehicle",
            assetDetails,
            totalCost,
            quantity
        );

        return NextResponse.json({
            message: "Vehicle purchased successfully",
            success: true,
            stock: {
                vehicleName: vehicleName,
                quantity,
                buyPrice: totalCost,
                buyDate: new Date(),
            },
        });
    } catch (error: any) {
        console.error("Error during vehicle purchase:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
