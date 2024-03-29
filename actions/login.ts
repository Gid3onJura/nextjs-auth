"use server"

export async function login(values: any) {
  console.log(values)
  try {
    const response = await fetch(process.env.API_BASE_URL + "/login", {
      method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "api-key": process.env.API_KEY,
      //   },
      body: JSON.stringify({
        nickname: "gideon22",
        password: "123456",
      }),
    })
    const result = await response.json()
    console.log("result:", result)
    return result
  } catch (err) {
    console.log(err)
    return null
  }
}
