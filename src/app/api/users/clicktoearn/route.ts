import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";
import { clickToEarn } from "@/utils/clickToEarn";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ message: "Invalid or missing token" }, { status: 401 });
        }

        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const moneyearned =  await clickToEarn(user.salary);
        if(user.salary - moneyearned < 0 || user.salary === 0){
            return NextResponse.json({message: "Insufficient balance!"}, {status:400})
        }

        user.moneyEarned = ((user.moneyEarned | 0) + moneyearned).toFixed(0);
        user.salary = (user.salary - moneyearned).toFixed(0);
        await user.save()

        return NextResponse.json({
            message: "User and Profile found",
            data: {...user.toObject()}
        });

    } catch (error: any) {
        // console.error("Error fetching user profile:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
