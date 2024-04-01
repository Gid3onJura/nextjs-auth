import { signOut } from "@/auth"

const HomePage = () => {
  return (
    <div>
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
