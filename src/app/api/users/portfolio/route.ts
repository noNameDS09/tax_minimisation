import User from "@/models/userModel";
import Vehicle from "@/models/vehicleModel";
import Stock from "@/models/stockModel";
import RealEstate from "@/models/realestateModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");

        if(!user){
            return NextResponse.json({
                message : "User does not exists",
                success : false
            }, {status: 404});
        }

        const stockData = await Stock.find({_id: userId});
        const vehicleData = await Vehicle.find({_id: userId});
        const realEstateData = await RealEstate.find({_id: userId});
        return NextResponse.json({
            stockData,
            vehicleData,
            realEstateData
        })

    } catch (error: any) {
        return NextResponse.json({
            error : error.message,
            success : false
        }, {status:500});
    }
}