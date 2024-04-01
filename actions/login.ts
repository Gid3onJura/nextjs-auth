"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    // validate input values
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Angaben falsch" }
    }

    const { nickname, password } = validatedFields.data

    try {
      await signIn("credentials", {
        nickname,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
      })
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Überprüfe deine Eingaben!" }
          default:
            return { error: "Etwas lief schief!" }
        }
      }

      throw error
    }
    return { error: "Etwas lief schief!" }
  } catch (err) {
    console.log(err)
    return { error: "Login nicht erfolgreich" }
  }
}
