import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
// import { sendEmail } from "@/utils/mail.helper";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // find if user already exists
        const user = await User.findOne({ email });
        if (user) { // if exists return
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // for hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ // creating a new user
            username: username, 
            email: email, 
            password: hashedPassword
        })

        const savedUser = await newUser.save() // saving the user in database
        console.log(savedUser);

        // send verification email
        // const mailResponse = await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User registered Successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
