import { NextResponse } from "next/server";
import { symbol } from "zod";
const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.US_STOCKS_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

const getStockQuote = (symbol:"AAPL") => {
    return new Promise((resolve, reject) => {
        finnhubClient.quote(symbol, (error:any, data:any, response:any) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.c);
            }
        });
    });
};

export async function GET() {
    try {
        const data = await getStockQuote("AAPL");
        // console.log(data);
        return NextResponse.json({ stockData: data }, {status:200});
    } catch (error:any) {
        console.error("Error fetching stock data:", error);
        return NextResponse.json({ message: "Failed to fetch stock data", error: error.message }, { status: 500 });
    }
};
