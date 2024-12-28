import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Stock from "@/models/stockModel";
import Vehicle from "@/models/vehicleModel";
import RealEstate from "@/models/realestateModel";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request); // Get userId from token
        // console.log("Decoded userId:", userId);

        if (!userId) {
            return NextResponse.json(
                { message: "Invalid or missing token" },
                { status: 401 }
            );
        }

        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User Not Found" }, { status: 400 });
        }
        const userTax = await User.findOne({ _id: userId }).select(
            "taxPaid -_id"
        );
        // console.log(typeof(userTax))
        if (!userTax) {
            return NextResponse.json({ message: "No tax" }, { status: 200 });
        }

        let stockTax = await Stock.findOne({ _id: userId }).select(
            "taxPaid -_id"
        );
        console.log(typeof stockTax);
        if (!stockTax) {
            stockTax = 0;
        }

        let vehicleTax = await Vehicle.findOne({ _id: userId }).select(
            "taxPaid -_id"
        );
        // console.log(vehicleTax)
        if (!vehicleTax) {
            vehicleTax = 0;
        }

        let realEstateTax = await RealEstate.findOne({ _id: userId }).select(
            "taxPaid -_id"
        );
        // console.log(realEstateTax)
        if (!realEstateTax) {
            realEstateTax = 0;
        }

        return NextResponse.json({
            message: "User and Profile found",
            userTax: userTax.taxPaid,
            stockTax: stockTax.taxPaid,
            vehicleTax: vehicleTax.taxPaid,
            realEstateTax: realEstateTax.taxPaid,
        });
    } catch (error: any) {
        // console.error("Error fetching user profile:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};