import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { getUser } from "./data/user"
import { UserRoles } from "@/next-auth"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      console.log({ user })

      const existingUser = await getUser()

      if (!existingUser || !existingUser.activated) {
        return false
      }
      return true
    },
    async session({ session, token }) {
      console.log({ sessionToken: token, session })

      const loggedInUser = await getUser()

      console.log({ loggedInUser })
      if (loggedInUser) {
        session.user = loggedInUser
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRoles
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const user = await getUser()

      if (!user) return token

      token.role = user.role ?? "USER"

      console.log("token:", { token })

      return token
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
})
