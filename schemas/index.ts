import * as z from "zod"

export const LoginSchema = z.object({
  nickname: z.string().min(1, {
    message: "Nickname is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})
