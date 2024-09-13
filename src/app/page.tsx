import SignOutButton from "@/components/SignOutButton"
import { getUser } from "./Library/lucia"
import { redirect } from "next/navigation"

export default async function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getUser()
  if (session === null) redirect("/Auth")
  return (
    <>
      <SignOutButton>Sign Out</SignOutButton>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">HI</h1>
      {children}
    </>
  )
}
