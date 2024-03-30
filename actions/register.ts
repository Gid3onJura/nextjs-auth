"use server"

import { RegisterSchema } from "@/schemas"
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Angaben falsch" }
    }

    const { name, nickname, password } = validatedFields.data

    return { success: "Registrierung erfolgreich" }
  } catch (err) {
    console.log(err)
    return { error: "Registrierung nicht erfolgreich" }
  }
}
