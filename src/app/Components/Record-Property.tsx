import { Decimal } from "@prisma/client/runtime/library"

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

  return (
    <label htmlFor={id} className="Record_Property">
      <span className="icon">{icon}</span>
      <span className="tag">{title}</span>
      <input
        className="value"
        type={type}
        autoComplete="off"
        id={id}
        value={value?.toString()}
      />
    </label>
  )
}
