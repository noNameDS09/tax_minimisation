import { connect } from "@/dbconfig/dbConfig";
import Stock from "@/models/stockModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { calculateTaxOnProfit } from "@/utils/taxCalculator";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { stockSymbol, quantity, currentRate, buyingRate } = reqBody;

        const userStock = await Stock.findOne({
            _id: userId,
            //   'stocks.stockSymbol': stockSymbol,
            //   'stocks.buyRate': buyingRate,
        });
        console.log(userStock.stocks);

        if (!userStock) {
            return NextResponse.json(
                { error: `No matching stock found` },
                { status: 400 }
            );
        }

        let stock = null;
        for (let s of userStock.stocks) {
            if (
                s.stockSymbol === stockSymbol &&
                s.buyRate === buyingRate &&
                s.quantity >= quantity
            ) {
                stock = s;
                break;
            }
        }
        console.log(`after userStock : ${stock}`);

        if (!stock) {
            return NextResponse.json(
                { error: "Insufficient stock quantity" },
                { status: 400 }
            );
        }

        stock.quantity -= quantity;

        if (stock.quantity === 0) {
            userStock.stocks = userStock.stocks.filter(
                (s) => s.stockSymbol !== stockSymbol
            );
        }

        const taxToBePaid = calculateTaxOnProfit(
            currentRate,
            stock.buyRate,
            quantity,
            12
        );
        console.log(taxToBePaid);
        userStock.taxPaid += taxToBePaid;

        await userStock.save();
        const totalReturn = quantity * currentRate - taxToBePaid;
        console.log(totalReturn);
        const user = await User.findOne({ _id: userId });
        // console.log(user)
        user.moneyEarned += totalReturn;
        user.taxPaid = (user.taxPaid || 0) + taxToBePaid;
        await user.save();

        return NextResponse.json({
            message: "Stock sold successfully",
            success: true,
            totalReturn,
            taxToBePaid,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
