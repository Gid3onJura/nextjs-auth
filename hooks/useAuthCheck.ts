// hooks/useAuthCheck.ts
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/auth/check")
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (!data.valid) throw new Error()
        setIsAuthenticated(true)
      } catch {
        setIsAuthenticated(false)
      }
    }
    check()
  }, [])

  return isAuthenticated
}
