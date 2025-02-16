import { connect } from "@/dbconfig/dbConfig";
import RealEstate from "@/models/realestateModel";
import Transaction from "@/models/transactionModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { calculateTaxOnProfit } from "@/utils/taxCalculator";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { realEstateName, quantity, currentRate, buyingRate } = reqBody;

        const userRealEstate = await RealEstate.findOne({
            _id: userId,
        });

        if (!userRealEstate) {
            return NextResponse.json(
                { error: `No matching real estate found` },
                { status: 400 }
            );
        }

        let realEstate = null;
        for (let s of userRealEstate.realestates) {
            if (
                s.realEstateName === realEstateName &&
                s.buyRate === buyingRate &&
                s.quantity >= quantity
            ) {
                realEstate = s;
                break;
            }
        }

        if (!realEstate) {
            return NextResponse.json(
                { error: "Insufficient real estate quantity" },
                { status: 400 }
            );
        }

        realEstate.quantity -= quantity;

        if (realEstate.quantity === 0) {
            userRealEstate.realestates = userRealEstate.realestates.filter(
                (s) => s.realEstateName !== realEstateName
            );
        }

        const taxToBePaid = calculateTaxOnProfit(
            currentRate,
            realEstate.buyRate,
            quantity,
            0.18
        );
        userRealEstate.taxPaid += taxToBePaid;

        await userRealEstate.save();
        const totalReturn = quantity * currentRate - taxToBePaid;
        const user = await User.findOne({ _id: userId });
        user.moneyEarned += totalReturn;
        user.taxPaid = parseFloat((user.taxPaid || 0) + taxToBePaid);
        user.taxPaid = parseFloat(user.taxPaid.toFixed(2))
        await user.save();


        const transactionData = {
            assetType: "realEstate",
            assetDetails: {
                realEstateName: realEstateName,
            },
            buyPrice: realEstate.buyRate,
            buyQuantity: realEstate.quantity += quantity,
            remainingQuantity: realEstate.quantity -= quantity,
            buyDate: realEstate.buyDate,
            sellPrice: currentRate,
            sellQuantity: quantity,
            sellDate: new Date(),
            taxPaid: taxToBePaid,
        };

        let transaction = await Transaction.findOne({ _id: userId });

        if (!transaction) {
            transaction = new Transaction({
                _id: userId,
                transactions: [transactionData],
                taxPaid: taxToBePaid,
            });
        } else {
            transaction.transactions.push(transactionData);
            transaction.taxPaid += taxToBePaid;
        }

        await transaction.save();


        return NextResponse.json({
            message: "Real Estate sold successfully",
            success: true,
            totalReturn,
            taxToBePaid,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
