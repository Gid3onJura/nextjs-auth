"use client"

import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useSession, signOut } from "next-auth/react"

const HomePage = () => {
  return <div>Home</div>
}

export default HomePage
