"use client"
import { signOut } from "@/app/Auth/auth.actions"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { mutate } from "swr"

export default function SignOutButton({
  children,
}: {
  children?: React.ReactNode
}) {
  const route = useRouter()
  async function handleSignOut() {
    await signOut()
    mutate("/API/records?activity=undefined")
    route.push("/Auth")
  }

  return (
    <Button
      className="inline-button !text-red-600 hover:!bg-red-900 hover:!text-foreground"
      onClick={handleSignOut}
    >
      {children}
    </Button>
  )
}
