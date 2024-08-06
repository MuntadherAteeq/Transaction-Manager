import { useState } from "react"
import Plus from "../Assets/Icons/Plus"
import { useRouter } from "next/navigation"

export default function AddButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/create-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "value" }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Record created:", data)
    } catch (error) {
      console.error("Error creating record:", error)
    } finally {
      setIsLoading(false)
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
