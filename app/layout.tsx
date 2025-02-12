import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Added import for React
import FloatingChatButton from "@/components/FloatingChatButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wika Mo, Wika Ko, Pero Bakit Parang Hindi Tayo",
  description: "Explore the linguistic landscape of the Philippines through our interactive survey results",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <FloatingChatButton />
      </body>
    </html>
  )
}

