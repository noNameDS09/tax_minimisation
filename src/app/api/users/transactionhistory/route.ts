import Transaction from "@/models/transactionModel";
import { connect } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const userTransactions = await Transaction.findOne({ _id: userId });

        if (!userTransactions) {
            return NextResponse.json(
                { message: "No transactions found for this user." },
                { status: 404 }
            );
        }

        return NextResponse.json(userTransactions, { status: 200 });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: `${err.message}` }, { status: 500 });
    }
}
