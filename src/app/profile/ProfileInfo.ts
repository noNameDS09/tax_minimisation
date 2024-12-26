import { connect } from '@/dbconfig/dbConfig';
import Profile from '@/models/profileModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, Name, Job, Salary, MoneyEarned, TaxPaid } = reqBody;

        console.log(reqBody);

        const existingProfile = await Profile.findOne({ id });
        if (existingProfile) {
            return NextResponse.json(
                { error: "Profile already exists" },
                { status: 400 }
            );
        }

        const newProfile = new Profile({
            id: id,
            Name: Name,
            Job: Job,
            Salary: Salary,
            MoneyEarned: MoneyEarned,
            TaxPaid: TaxPaid
        });

        const savedProfile = await newProfile.save();
        console.log(savedProfile);

        return NextResponse.json({
            message: "Profile created successfully",
            success: true,
            savedProfile
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
