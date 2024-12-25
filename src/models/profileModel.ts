import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    job: {
        type: String,
        required: [true, "Please provide your job title"], // Ensuring this field is required
    },
    salary: {
        type: Number,
        required: [true, "Please provide your salary"], // Ensuring this field is required
    },
    moneyEarned: {
        type: Number,
        required: [true, "Please provide your money earned"], // Ensuring this field is required
    },
    taxPaid: {
        type: Number,
        required: [true, "Please provide the tax paid"], // Ensuring this field is required
    }
});

const Profile = mongoose.models.profiles || mongoose.model('profiles', profileSchema);

export default Profile;
