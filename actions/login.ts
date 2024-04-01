"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { jwtDecode } from "jwt-decode"

interface JwTProps {
  id: number
  nickname: string
  iat: number
  exp: number
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Angaben falsch" }
    }

    const url = process.env.API_BASE_URL + "/login"

    const apikey = process.env.API_KEY || null

    if (!apikey) {
      return { error: "Login nicht möglich" }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apikey,
      },
      body: JSON.stringify(validatedFields.data),
    })
    const result = await response.json()
    if (result && result.accessToken) {
      const decodedJwt = jwtDecode<JwTProps>(result.accessToken)

      console.log(result)
      console.log(decodedJwt)

      return { success: "Login erfolgreich" }
    }
    return { error: "Login nicht erfolgreich" }
  } catch (err) {
    console.log(err)
    return { error: "Login nicht erfolgreich" }
  }
}
