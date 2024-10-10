import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Table } from "@prisma/client"
import React, { useRef } from "react"
import { useState } from "react"

export default function AmountInput({
  className,
  // table,
  ...props
}: {
  table: Table
  className?: string
  props?: React.InputHTMLAttributes<HTMLInputElement>
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [amount, setAmount] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const ref = useRef<HTMLInputElement>(null)

  const handleBlur = () => {
    setIsFocused(false)
    price === 0
      ? setAmount("")
      : setAmount((amount) => Number(amount).toFixed(3))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setPrice(Number(e.target.value))
  }

  React.useLayoutEffect(() => {
    isFocused && ref.current?.select()
  }, [isFocused])

  return (
    <Input
      ref={ref}
      type="number"
      autoFocus={isFocused}
      onDoubleClick={() => {
        setIsFocused(true)
      }}
      onBlur={handleBlur}
      readOnly={!isFocused}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Tab") {
          handleBlur()
        } else {
          setIsFocused(true)
        }
      }}
      value={isFocused ? price.toString() : amount}
      className={cn(
        `${!isFocused && "cursor-default select-none"} `,
        className
      )}
      {...props}
    />
  )
}
