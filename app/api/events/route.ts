import { getAccessToken } from "@/data/user"
import { NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL // serverseitig verfügbar
const API_KEY = process.env.API_KEY // serverseitig verfügbar

export async function GET() {
  const accessToken = await getAccessToken()

  try {
    const res = await fetch(`${API_BASE_URL}/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(API_KEY ? { "api-key": API_KEY } : {}),
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Fehler beim Laden der Events" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await fetch(`${API_BASE_URL}/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Fehler beim Erstellen des Events" }, { status: 500 })
  }
}
