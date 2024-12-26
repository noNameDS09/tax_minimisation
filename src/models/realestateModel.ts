import mongoose from "mongoose";

const realEstateSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        realestates: [
            {
                realEstateName: {
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

const RealEstate = mongoose.models.realestates || mongoose.model("realestates", realEstateSchema);

export default RealEstate;