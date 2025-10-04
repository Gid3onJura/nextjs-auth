"use client"

import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const ProfilPage = () => {
  const user = useCurrentUser()
  const nickname = user?.nickname || "Nutzer"

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Profil</h1>

      <p className="text-lg text-primary mb-4">Hallo, {nickname}</p>
      <Button variant={"default"}>
        <LogoutButton>Abmelden</LogoutButton>
      </Button>
    </div>
  )
}

export default ProfilPage
