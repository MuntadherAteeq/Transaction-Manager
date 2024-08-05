import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.scss"
import ActivityBar from "./Layout/ActivityBar"
import TitleBar from "./Layout/Title-Bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Transaction Manager",
  description: "Transaction Manager App for your personal finance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TitleBar />
        <div className="App-Container">
          <ActivityBar />
          {children}
        </div>
      </body>
    </html>
  )
}
