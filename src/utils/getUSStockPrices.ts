const finnhub = require('finnhub')

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.US_STOCKS_API_KEY
const finnhubClient = new finnhub.DefaultApi()

export async function GET() {
    finnhubClient.quote("AAPL", (error, data, response) => {
    console.log(data)
    });
}
