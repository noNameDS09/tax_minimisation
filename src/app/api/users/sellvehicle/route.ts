import { connect } from "@/dbconfig/dbConfig";
import Vehicle from "@/models/vehicleModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { calculateTaxOnProfit } from "@/utils/taxCalculator";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { vehicleName, quantity, currentRate, buyingRate } = reqBody;

        const userVehicle = await Vehicle.findOne({
            _id: userId,
        });
        // console.log(userVehicle.vehicles);

        if (!userVehicle) {
            return NextResponse.json(
                { error: `No matching vehicle found` },
                { status: 400 }
            );
        }

        let vehicle = null;
        for (let s of userVehicle.vehicles) {
            if (
                s.vehicleName === vehicleName &&
                s.buyRate === buyingRate &&
                s.quantity >= quantity
            ) {
                vehicle = s;
                break;
            }
        }

        if (!vehicle) {
            return NextResponse.json(
                { error: "Insufficient vehicle quantity" },
                { status: 400 }
            );
        }

        vehicle.quantity -= quantity;

        if (vehicle.quantity === 0) {
            userVehicle.vehicles = userVehicle.vehicles.filter(
                (s) => s.vehicleName !== vehicleName
            );
        }

        const taxToBePaid = calculateTaxOnProfit(
            currentRate,
            vehicle.buyRate,
            quantity,
            0.12
        );
        // console.log(taxToBePaid);
        userVehicle.taxPaid += taxToBePaid;

        await userVehicle.save();
        const totalReturn = quantity * currentRate - taxToBePaid;
        // console.log(totalReturn);
        const user = await User.findOne({ _id: userId });
        // console.log(user)
        user.moneyEarned += totalReturn;
        user.taxPaid = (user.taxPaid || 0) + taxToBePaid;
        await user.save();

        return NextResponse.json({
            message: "Vehicle sold successfully",
            success: true,
            totalReturn,
            taxToBePaid,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
