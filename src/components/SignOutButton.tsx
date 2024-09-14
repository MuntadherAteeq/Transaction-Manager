"use client"
import { signOut } from "@/app/Auth/auth.actions"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function SignOutButton({
  children,
}: {
  children?: React.ReactNode
}) {
  const route = useRouter()
  async function handleSignOut() {
    await signOut()
    route.push("/Auth")
  }

  return (
    <Button className="inline-button" onClick={handleSignOut}>
      {children}
    </Button>
  )
}
