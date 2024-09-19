import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

export function GlassTooltip({
  position,
  children,
  content,
  ...props
}: {
  position?: "right" | "left" | "top" | "bottom" | undefined
  children?: React.ReactNode
  content?: React.ReactNode
  props?: React.HTMLAttributes<HTMLDivElement>
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div {...props}>{children}</div>
          </TooltipTrigger>
          <TooltipContent side={position}>
            <div
              role="tooltip"
              className=" px-3 py-2 text-sm font-medium rounded-lg shadow-sm backdrop-blur-sm border-[1px] bg-transparent "
            >
              {content}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
