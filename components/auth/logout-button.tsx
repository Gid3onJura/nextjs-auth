"use client"

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
  children: React.ReactNode
  asChild?: boolean
}

export const LogoutButton = ({ children, asChild }: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
