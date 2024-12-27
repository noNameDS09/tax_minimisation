import { runChatbot } from "@/utils/chatBot";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { prompt } = reqBody;

        if (!prompt || prompt.trim().length === 0) {
            return NextResponse.json({
                message: "Please provide a valid prompt."
            }, { status: 400 });
        }

        const response = await runChatbot(prompt);
        return NextResponse.json({
            output: response
        }, { status: 200 });
    } catch (error: any) {
        // console.log(error, error.message)
        return NextResponse.json({
            message: `Error occurred: ${error.message}`,
            success: false
        }, { status: 500 });
    }
}
