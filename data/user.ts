import { CssSyntaxError } from "postcss"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { jwtDecode } from "jwt-decode"

interface JwTProps {
    id: number
    nickname: string
    iat: number
    exp: number
  }

export const getUserById = async (userid: number) => {
  try {
    // get access token from cookie
    // get cookie
    const cookieStore = cookies()
    const cookie = cookieStore.get(process.env.JWT_COOKIE_NAME || "")

    if (!cookie) {
      return null
    }

    // verify cookie
    const jwtSecret = process.env.JWT_SECRET || ""

    const cookieValue = verify(cookie.value, jwtSecret)

    // user data decoded
    const decodedJwt = jwtDecode<JwTProps|string>(cookieValue)

    // fetch user data from api
    const url = process.env.API_BASE_URL + "/user"

    const apikey = process.env.API_KEY || null

    if (!apikey) {
      return null
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + , 
        "Content-Type": "application/json",
        "api-key": apikey,
      }
    })

    // return user data
  } catch (error) {}
}
