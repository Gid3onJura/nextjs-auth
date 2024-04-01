import { CssSyntaxError } from "postcss"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { jwtDecode } from "jwt-decode"

interface UserProps {
  id: number
  nickname: string
  iat: number
  exp: number
}

interface JwTProps {
  accessToken: string
  iat: number
  exp: number
}

export const getUser = async () => {
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

    const cookieValue = verify(cookie.value, jwtSecret) as JwTProps

    // user data decoded
    const decodedJwt = jwtDecode<UserProps>(cookieValue.accessToken)

    const userId = decodedJwt.id

    // fetch user data from api
    const url = process.env.API_BASE_URL + "/user/" + userId

    const apikey = process.env.API_KEY || null

    const accessToken = cookieValue.accessToken

    if (!apikey || !userId || !accessToken) {
      return null
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        "api-key": apikey,
      },
    })

    // get data from response
    const result = await response.json()
    return result

    // return user data
  } catch (error) {}
}
