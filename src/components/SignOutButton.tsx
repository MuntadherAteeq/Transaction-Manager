"use client"
import { signOut } from "@/app/Auth/auth.actions"
import { useRouter } from "next/navigation"
import { mutate } from "swr"

export default function SignOutButton({ ...props }) {
  const route = useRouter()
  async function handleSignOut() {
    await signOut()
    mutate("/API/records?activity=undefined")
    route.push("/Auth")
  }

  return (
    <button onClick={handleSignOut} {...props}>
      {props.children}
    </button>
  )
}
