import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Nunito as NunitoFont } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

const inter = Inter({ subsets: ["latin"] })

const nunitoFont = NunitoFont({
  subsets: ["latin"],
  variable: "--nunito-font",
})

export const metadata: Metadata = {
  title: "NextJs Authentication",
  description: "NextJs Authentication",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html className="h-full" lang="de">
        <body className={cn("h-full bg-sky-500 antialiased", nunitoFont.variable)}>{children}</body>
      </html>
    </SessionProvider>
  )
}
