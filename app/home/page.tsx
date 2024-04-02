import { auth, signOut } from "@/auth"
import { getUser } from "@/data/user"

const HomePage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server"

          await signOut()
        }}
      >
        <button type="submit">Ausloggen</button>
      </form>
    </div>
  )
}

export default HomePage
