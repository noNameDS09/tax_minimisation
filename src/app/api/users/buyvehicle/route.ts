import { connect } from "@/dbconfig/dbConfig";
import Vehicle from "@/models/vehicleModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import calculateTax from "@/utils/taxCalculator";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { vehicleName, quantity, price } = reqBody;
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

        let existingVehicle = await Vehicle.findOne({ _id: userId });

        if (existingVehicle) {
            const stockIndex = existingVehicle.vehicles.findIndex(
                (stock:any) => stock.vehicleName === vehicleName
            );

            if (stockIndex !== -1) {
                existingVehicle.vehicles[stockIndex].quantity += quantity;
                existingVehicle.vehicles[stockIndex].buyPrice = price;
                existingVehicle.vehicles[stockIndex].buyDate = new Date();
            } else {
                existingVehicle.vehicles.push({
                    vehicleName,
                    quantity,
                    buyPrice: price,
                    buyDate: new Date(),
                });
            }

            await existingVehicle.save();
        } else {
            const newStock = new Vehicle({
                _id: userId,
                vehicles: [
                    {
                        vehicleName: vehicleName,
                        quantity: quantity,
                        buyPrice: price,
                        buyDate: new Date(),
                    },
                ],
            });

            await newStock.save();
        }

        return NextResponse.json({
            message: "Vehicle purchased successfully",
            success: true,
            stock: {
                vehicleName: vehicleName,
                quantity,
                buyPrice: price,
                buyDate: new Date(),
            },
        });
    } catch (error: any) {
        console.error("Error during vehicle purchase:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
