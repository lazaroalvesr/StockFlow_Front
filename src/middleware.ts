import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const getCookie = request.cookies.get("access_token")

    if (!getCookie) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"]
}