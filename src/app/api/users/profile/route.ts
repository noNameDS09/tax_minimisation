import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ message: "Invalid or missing token" }, { status: 401 });
        }

        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User and Profile found",
            data: {...user.toObject()}
        });

    } catch (error: any) {
        // console.error("Error fetching user profile:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
