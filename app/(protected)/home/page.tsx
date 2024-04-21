"use client"

import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useSession, signOut } from "next-auth/react"

const HomePage = () => {
  const user = useCurrentUser()

  const handleSignOut = () => {
    // if you use on client side
    // signOut()

    // if you use on server side
    logout()
  }

  return (
    <div className="bg-white rounded-xl p-3">
      <button onClick={handleSignOut} type="submit">
        Ausloggen
      </button>
    </div>
  )
}

export default HomePage
