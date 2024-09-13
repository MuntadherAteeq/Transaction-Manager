"use client"
import { signOut } from "@/app/Auth/auth.actions"
import { Button } from "./ui/button"

export default function SignOutButton({
  children,
}: {
  children?: React.ReactNode
}) {
  async function handleSignOut() {
    await signOut()
  }

  return <Button onClick={handleSignOut}>{children}</Button>
}
