import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        vehicles: [
            {
                vehicleName: {
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

const Vehicle =
    mongoose.models.vehicles || mongoose.model("vehicles", vehicleSchema);

export default Vehicle;