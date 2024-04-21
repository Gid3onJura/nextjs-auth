import { useSession } from "next-auth/react"

export const useCurrentUser = () => {
  const session = useSession()

  if (!session || !session.data?.user.id) {
    return null
  }

  return session.data?.user
}
