import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

export default function AmountInput({
  className,
  disabled,
  ...props
}: {
  className?: string
  disabled?: boolean
  props?: React.InputHTMLAttributes<HTMLInputElement>
}) {
  const [amount, setAmount] = useState<string>("")
  const [isFocused, setIsFocused] = useState<boolean>(disabled || false)

  return (
    <>
      <Input
        type="text"
        autoFocus={isFocused}
        onDoubleClick={(e) => {
          setIsFocused(true)
        }}
        onBlur={() => setIsFocused(false)}
        readOnly={!isFocused}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && setIsFocused(false)}
        value={amount}
        className={cn(
          `${!isFocused && "cursor-default select-none"} `,
          className
        )}
        {...props}
      />
    </>
  )
}
