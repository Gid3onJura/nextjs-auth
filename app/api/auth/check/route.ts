// app/api/auth/check/route.ts
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const cookieName = process.env.JWT_COOKIE_NAME || ""
    const jwtSecret = process.env.JWT_SECRET || ""

    const cookie = cookieStore.get(cookieName)
    if (!cookie) {
      return NextResponse.json({ valid: false, reason: "no_cookie" }, { status: 401 })
    }

    // verify JWT
    verify(cookie.value, jwtSecret)
    return NextResponse.json({ valid: true })
  } catch (err: any) {
    return NextResponse.json({ valid: false, reason: err.message || "invalid_token" }, { status: 401 })
  }
}
