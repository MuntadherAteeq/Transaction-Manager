import { useState } from "react"
import Plus_Icon from "../Assets/Icons/Plus"
import { useRouter } from "next/navigation"
import { mutate } from "swr"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"

export default function AddRecord({ activity }: { activity: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const route = useRouter()
  const handleClick = async () => {
    setIsLoading(true)

    const response = await fetch("/API/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activity }),
    })
    if (response.ok) {
      setIsLoading(false)
      const list = await mutate(`/API/records?activity=${activity}`)
      if (list && Array.isArray(list))
        route.replace(`/${activity}/${list[0].id}`)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="Primary-Button flex items-center"
          onClick={handleClick}
          disabled={isLoading}
        >
          <Plus_Icon />
        </TooltipTrigger>
        <TooltipContent side="top">
          <div
            role="tooltip"
            className="animate-fadeIn m-2 px-2 py-1 text-sm font-medium rounded-lg shadow-sm tooltip backdrop-blur-sm border-[1px] bg-transparent]"
          >
            Add New Record
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
