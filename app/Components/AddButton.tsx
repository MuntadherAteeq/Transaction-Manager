import { useState } from "react"
import Plus from "../Assets/Icons/Plus"
import { useRouter } from "next/navigation"
import useSWR, { mutate } from "swr"

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
    if (await response.ok) {
      setIsLoading(false)
      mutate("/api/archive-records")
    }
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
