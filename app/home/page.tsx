import { signOut } from "@/auth"
import { getUser } from "@/data/user"

const HomePage = async () => {
  const user = await getUser()

  return (
    <div>
      {JSON.stringify(user)}
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
