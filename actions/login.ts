"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
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
      body: JSON.stringify(values),
    })
    const result = await response.json()
    if (result && result.accessToken) {
      return { success: "Login erfolgreich" }
    }
    return { error: "Login nicht erfolgreich" }
  } catch (err) {
    console.log(err)
    return { error: "Login nicht erfolgreich" }
  }
}
