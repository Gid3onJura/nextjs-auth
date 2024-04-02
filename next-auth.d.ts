import NextAuth, { type DefaultSession } from "next-auth"

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRoles
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
