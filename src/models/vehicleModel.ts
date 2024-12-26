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

const Vehicle = mongoose.models.vehicles || mongoose.model("vehicles", vehicleSchema);

export default Vehicle;
