import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        stocks: [
            {
                stockSymbol: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                buyPrice: {
                    type: Number,
                    required: true,
                },
                sellPrice: {
                    type: Number,
                    default: null,
                },
                buyDate: {
                    type: Date,
                    required: true,
                },
                sellDate: {
                    type: Date,
                    default: null,
                },
            },
        ],
    },
    { timestamps: true }
);

const Stock = mongoose.models.stocks || mongoose.model("stocks", stockSchema);

export default Stock;
