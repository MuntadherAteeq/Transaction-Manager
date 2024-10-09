import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Table } from "@prisma/client"
import React from "react"
import { useState } from "react"

export default function AmountInput({
  className,
  disabled,
  // table,
  ...props
}: {
  table: Table
  className?: string
  disabled?: boolean
  props?: React.InputHTMLAttributes<HTMLInputElement>
}) {
  const [isFocused, setIsFocused] = useState(!disabled)
  const [amount, setAmount] = useState<string>("")
  const [price, setPrice] = useState<number>(0)

  const handleBlur = () => {
    setIsFocused(false)
    setAmount((amount) => Number(amount).toFixed(3))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setPrice(Number(e.target.value))
  }

  React.useLayoutEffect(() => {
    if (price === 0) setAmount("")
  }, [isFocused])

  return (
    <Input
      type="number"
      autoFocus={isFocused}
      onDoubleClick={() => {
        setIsFocused(true)
      }}
      onBlur={handleBlur}
      readOnly={!isFocused}
      onChange={handleChange}
      onKeyDown={(e) => (e.key === "Enter" || e.key === "Tab") && handleBlur()}
      value={isFocused ? price.toString() : amount}
      className={cn(
        `${!isFocused && "cursor-default select-none"} `,
        className
      )}
      {...props}
    />
  )
}
