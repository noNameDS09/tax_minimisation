import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVarified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry :{
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry : {
        type: Date
    },
    job: {
        type: String,
        required: [false, "Please provide your job description"],
    },
    salary: {
        type: Number,
        required: [false, 0],
    },
    moneyEarned: {
        type: Number,
        required: [false, 0],
    },
    taxPaid: {
        type: Number,
        required: [false, 0],
    }
})

const User = mongoose.models.users ||  mongoose.model("users", userSchema);

export default User;