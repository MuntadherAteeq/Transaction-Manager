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

export default function AddButton({ activity }: { activity: string }) {
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
      if (list && Array.isArray(list)) {
        const record = list[list.length - 1]
        route.push(`/${activity}/${record.id}`)
      }
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
        <TooltipContent side="right">
          <div
            role="tooltip"
            className=" px-3 py-2 text-sm font-medium   rounded-lg shadow-sm tooltip bg-background"
          >
            Create new Record
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
