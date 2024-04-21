"use client"

import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathName = usePathname()
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm w-[600px]">
      <div className="flex gap-x-2">
        <Button asChild variant={pathName === "/home" ? "default" : "outline"}>
          <Link href="/home">Home</Link>
        </Button>
        <Button asChild variant={pathName === "/profile" ? "default" : "outline"}>
          <Link href="/profile">Profil</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}

export default Navbar
