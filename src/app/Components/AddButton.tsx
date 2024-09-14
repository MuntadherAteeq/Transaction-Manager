import { useState } from "react"
import Plus_Icon from "../Assets/Icons/Plus"
import { usePathname } from "next/navigation"
import { mutate } from "swr"

export default function AddButton() {
  const [isLoading, setIsLoading] = useState(false)
  const activity = usePathname().split("/")[1]
  const handleClick = async () => {
    setIsLoading(true)

    const response = await fetch("/API/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activity }),
    })
    if (await response.ok) {
      setIsLoading(false)
      mutate(`/API/records?activity=${activity}`)
    }
  }

  return (
    <button
      className="Primary-Button"
      onClick={handleClick}
      disabled={isLoading}
    >
      <Plus_Icon />
    </button>
  )
}
