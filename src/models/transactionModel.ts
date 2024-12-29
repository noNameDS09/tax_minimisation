import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        transactions: [
            {
                assetType: {
                    type: String,
                    required: true,
                    enum: ["stock", "vehicle", "realEstate"],
                },

                assetDetails: {
                    stockSymbol: {
                        type: String,
                        required: function () {
                            return this.assetType === "stock";
                        },
                    },
                    vehicleName: {
                        type: String,
                        required: function () {
                            return this.assetType === "vehicle";
                        },
                    },
                    realEstateName: {
                        type: String,
                        required: function () {
                            return this.assetType === "realEstate";
                        },
                    },
                },

                buyPrice: {
                    type: Number,
                    required: true,
                },
                buyQuantity: {
                    type: Number,
                    required: true,
                },
                buyDate: {
                    type: Date,
                    required: true,
                },

                sellPrice: {
                    type: Number,
                    default: null,
                },
                sellQuantity: {
                    type: Number,
                    default: null,
                },
                sellDate: {
                    type: Date,
                    default: null,
                },

                taxPaid: {
                    type: Number,
                    default: 0,
                },
            },
        ],

        taxPaid: {
            type: Number,
            default: 0,
            required: false,
        },
    },
    { timestamps: true }
);

const Transaction =
    mongoose.models.transactions ||
    mongoose.model("transactions", transactionSchema);

export default Transaction;