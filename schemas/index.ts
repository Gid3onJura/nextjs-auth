import * as z from "zod"

export const LoginSchema = z.object({
  nickname: z.string().min(1, {
    message: "Nickname ist notwendig",
  }),
  password: z.string().min(1, {
    message: "Passwort ist notwendig",
  }),
})

export const RegisterSchema = z.object({
  nickname: z.string().min(1, {
    message: "Nickname ist notwendig",
  }),
  password: z.string().min(6, {
    message: "Mindestens 6 Zeichen muss das Passwort haben",
  }),
  name: z.string().min(1, {
    message: "Name ist notwendig",
  }),
})
