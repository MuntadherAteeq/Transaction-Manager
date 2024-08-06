import { useState } from "react"
import Plus from "../Assets/Icons/Plus"
import { redirect, useRouter } from "next/navigation"

export default function AddButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)

    const response = await fetch("/api/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: "value" }),
    })
    await router.push("/Archive")
  }

  return (
    <button
      className="Primary-Button"
      onClick={handleClick}
      disabled={isLoading}
    >
      <Plus />
    </button>
  )
}
