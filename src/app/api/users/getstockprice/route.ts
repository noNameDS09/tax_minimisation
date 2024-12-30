import { NextResponse } from "next/server";
const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.US_STOCKS_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

const getStockQuote = (symbol:string) => {
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

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const symbol = url.searchParams.get("symbol");
        if (!symbol) {
            return NextResponse.json(
              { message: "Symbol is required" },
              { status: 400 }
            );
          }
        const data = await getStockQuote(symbol);
        // console.log(data);
        return NextResponse.json({ stockData: data }, {status:200});
    } catch (error:any) {
        console.error("Error fetching stock data:", error);
        return NextResponse.json({ message: "Failed to fetch stock data", error: error.message }, { status: 500 });
    }
};