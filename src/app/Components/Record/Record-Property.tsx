"use client"
import { Decimal } from "@prisma/client/runtime/library"
import { useState } from "react"

export interface RecordPropertyProps {
  title: string
  type: string
  icon: React.ReactNode
  value?: string | number | Decimal | Date | null
}

export function Record_Property({
  title,
  type,
  icon,
  value,
}: RecordPropertyProps) {
  const id = crypto.getRandomValues(new Uint32Array(1))[0].toString()
  const [data, setData] = useState(value?.toString())

  return (
    <label htmlFor={id} className="Record_Property">
      <span className="icon">{icon}</span>
      <span className="tag">{title}</span>
      <input
        className="value"
        type={type}
        autoComplete="off"
        id={id}
        onChange={(e) => setData(e.target.value)}
        value={data}
        readOnly
      />
    </label>
  )
}
