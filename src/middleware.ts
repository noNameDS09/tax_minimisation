import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup";

    const token = request.cookies.get("token")?.value || "";
    // console.log(token)

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    // if (token === "") {
    //     return NextResponse.redirect(new URL("/logout", request.nextUrl));
    // }
    // console.log(`token is ${token}`)
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        // '/',
        "/profile",
        "/login",
        "/signup",
        // '/verifyemail'
    ],
};
