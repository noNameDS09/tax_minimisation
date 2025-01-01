import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { getDataFromToken } from '@/utils/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        let { userJob, userSalary, userMoneyEarned, userTaxPaid } = reqBody;

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
        userSalary = parseFloat(userSalary)
        existingProfile.salary = parseFloat(userSalary.toFixed(2));
        userMoneyEarned = parseFloat(userMoneyEarned)
        existingProfile.moneyEarned = userMoneyEarned;
        userTaxPaid = parseFloat(userTaxPaid)
        existingProfile.taxPaid = parseFloat(userTaxPaid.toFixed(2));
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
