# Finance Management Website (Next.js)

Welcome to the **Finance Management Website** built with **Next.js**! This platform enables users to manage their finances, including salary management, asset trading, and portfolio management. Users can interact with real-time stock, vehicle, and real estate markets, track their transactions, and receive financial advice through an integrated chatbot.

## Features

- **User Authentication**:
  - Users can sign up or log in to access the platform.
  - Profiles include personal details like salary and profession.

- **Money Management**:
  - Transfer money from the user’s salary to the "Money Earned" section.
  - User can easily manage and track their earnings.

- **Asset Trading**:
  - Users can buy and sell real-time stocks, vehicles, and real estate.
  - Prices for assets are updated in real time based on current market conditions.
  - Each purchase involves tax, which varies based on the asset type (stocks, vehicles, real estate).
  - Tax is only applied to profit on sales (no tax on loss-making transactions).

- **Portfolio**:
  - Users have access to a portfolio that tracks their assets and financial standing.

- **Transaction History**:
  - View past transactions and financial activities in a comprehensive history log.

- **Financial Chatbot**:
  - Integrated chatbot provides financial advice, answering user queries about finance-related topics.

## Tech Stack

- **Next.js** – for server-side rendering, routing, and static site generation.
- **React** – for building the user interface.
- **Mongodb** - for database
- **Real-time APIs** – to fetch real-time asset prices for stocks, vehicles, and real estate.
- **CSS/Styled Components** – for UI styling.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/noNameDS09/tax_minimisation.git
```

### 2. Install Dependencies
```bash
cd tax_mminimisation
npm install
```

### 3.Requirements
#### You need to set up the mongodb variables accordingly.
#### Set up the environment variables like :
```
MONGODB_URI = mongodb://127.0.0.1:27017/<yourdatabasename>
TOKEN_SECRET = yourtokensecret
DOMAIN = http://localhost:3000
CHATBOT_API = <getTheChatBotApiKeyFromLangChain>
CHATBOT_MODEL_NAME = <geminiModel>
US_STOCKS_API_KEY = <getApiKeyFrom'finnhub'>
```
### 4. Run the project
```bash
npm run dev
```

## License
This project is licensed under the MIT License.
