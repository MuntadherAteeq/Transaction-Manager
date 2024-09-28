"use client"
import { Input } from "@/components/ui/input"
import { Decimal } from "@prisma/client/runtime/library"

export interface RecordPropertyProps {
  title: string
  type: string
  icon: React.ReactNode
  value?: string | number | Decimal | Date | null
  readOnly?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
}

export function Record_Property({
  title,
  type,
  icon,
  value,
  readOnly,
  register,
}: RecordPropertyProps) {
  return (
    <label htmlFor={title} className="Record_Property">
      <span className="icon">{icon}</span>
      <span className="tag">{title}</span>
      <Input
        id={title}
        className="value"
        type={type}
        autoComplete="off"
        readOnly={readOnly}
        defaultValue={value !== null || value === 0 ? value : ""}
        {...register}
      />
    </label>
  )
}
