import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select(
        "-password -username"
    );

    // if no user
    if (!user) {
        return NextResponse.json({
            error: "User not found",
            success: false,
        });
    }

    return NextResponse.json(
        { message: "User found", data: user },
        { status: 200 }
    );
}
