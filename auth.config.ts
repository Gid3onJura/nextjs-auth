import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { LoginSchema } from "@/schemas"
import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"
import { sign } from "jsonwebtoken"

interface JwTProps {
  id: number
  nickname: string
  iat: number
  exp: number
}

interface User {
  id: string
  nickname: string
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials): Promise<User | null> {
        try {
          const validatedFields = LoginSchema.safeParse(credentials)

          if (validatedFields.success) {
            const url = process.env.API_BASE_URL + "/login"

            const apikey = process.env.API_KEY || null

            if (!apikey) {
              return null
            }

            // api login
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": apikey,
              },
              body: JSON.stringify(validatedFields.data),
            })

            // get access token
            const result = await response.json()

            if (result && result.accessToken) {
              const userNickname = validatedFields.data.nickname
              const decodedJwt = jwtDecode<JwTProps>(result.accessToken)
              const accessToken = result.accessToken || ""
              const jwtSecret = process.env.JWT_SECRET || ""
              const cookieLifetime = parseInt(process.env.JWT_LIFETIME || "604800", 10)
              const cookieName = process.env.JWT_COOKIE_NAME || "SDK_USER_COOKIE"
              const cookieToken = sign(
                {
                  accessToken,
                },
                jwtSecret,
                {
                  expiresIn: process.env.JWT_LIFETIME,
                }
              )

              // save cookie
              cookies().set({
                name: cookieName,
                value: cookieToken,
                httpOnly: true,
                path: "/",
                maxAge: cookieLifetime,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
              })

              return {
                id: decodedJwt.id.toString(),
                nickname: decodedJwt.nickname,
              }
            }
          }
          return null
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
