import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

export default function AmountInput({
  render,
  className,
  ...props
}: {
  render?: React.ReactNode
  className?: string
  props?: React.InputHTMLAttributes<HTMLInputElement>
}) {
  const [amount, setAmount] = useState<string>()
  const [isRender, setIsRenderer] = useState(true)

  return (
    <>
      {isRender ? (
        <div
          onDoubleClick={() => {
            setIsRenderer(false)
          }}
          className={cn(
            "flex  items-center select-none h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {render || Number(amount).toFixed(3)} BD
        </div>
      ) : (
        <Input
          type="number"
          autoFocus
          onClick={() => {
            setIsRenderer(true)
          }}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          onBlur={() => {
            setAmount(amount)
            setIsRenderer(true)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setAmount(amount)
              setIsRenderer(true)
            }
          }}
          value={amount}
          className={cn("", className)}
          {...props}
        />
      )}
    </>
  )
}
