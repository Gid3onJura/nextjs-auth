import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Nunito as NunitoFont } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

const nunitoFont = NunitoFont({
  subsets: ["latin"],
  variable: "--nunito-font",
})

export const metadata: Metadata = {
  title: "NextJs Authentication",
  description: "NextJs Authentication",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={cn("min-h-screen bg-sky-500 antialiased", nunitoFont.variable)}>{children}</body>
    </html>
  )
}
