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
                buyRate: {
                    type: Number,
                    required: true,
                },
                buyPrice: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                buyDate: {
                    type: Date,
                    required: true,
                },
                sellRate: {
                    type: Number,
                    default: null,
                },
                sellPrice: {
                    type: Number,
                    required: false,
                    default: 0,
                },
                sellDate: {
                    type: Date,
                    default: null,
                },

            },
        ],
        taxPaid: {
            type: Number,
            default: 0,
            required: false,
        }
    },
    { timestamps: true }
);

const Stock = mongoose.models.stocks || mongoose.model("stocks", stockSchema);

export default Stock;
