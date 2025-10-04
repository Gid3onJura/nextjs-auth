"use client"

import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CgProfile } from "react-icons/cg"
import { FaHome } from "react-icons/fa"

const Navbar = () => {
  const pathName = usePathname()
  return (
    <nav className="bg-secondary flex justify-between p-4 rounded-xl shadow-sm w-full sticky">
      <div className="flex gap-x-2">
        <Button asChild variant={pathName === "/home" ? "default" : "outline"}>
          <Link href="/home">
            <FaHome className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant={pathName === "/profile" ? "default" : "outline"}>
          <Link href="/profile">
            <CgProfile className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}

export default Navbar
