import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas"

export default {
  providers: [
    Credentials({
      // credentials: {
      //   username: { label: "Username" },
      //   password: {  label: "Password", type: "password" }
      // },
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { nickname, password } = validateFields.data
        }
      },
    }),
  ],
} satisfies NextAuthConfig
