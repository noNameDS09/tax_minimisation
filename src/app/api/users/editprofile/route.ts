import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { getDataFromToken } from '@/utils/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userJob, userSalary, userMoneyEarned, userTaxPaid } = reqBody;

        const userId = await getDataFromToken(request);
        console.log("User ID from token:", userId);

        if (!userId) {
            return NextResponse.json({ message: "Invalid or missing token" }, { status: 401 });
        }

        let existingProfile = await User.findOne({ _id: userId });

        if (!existingProfile) {
            return NextResponse.json({
                message: "Can't create profile. Please login first!",
                success: false,
            });
        }

        existingProfile.job = userJob;
        existingProfile.salary = userSalary;
        existingProfile.moneyEarned = userMoneyEarned;
        existingProfile.taxPaid = userTaxPaid;
        const updatedProfile = await existingProfile.save();

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
            updatedProfile
        });


    } catch (error: any) {
        console.error("Error during profile update/creation:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
