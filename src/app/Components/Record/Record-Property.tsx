"use client";
import { Input } from "@/components/ui/input";
import { Decimal } from "@prisma/client/runtime/library";
import { cn } from "@/lib/utils";

export interface RecordPropertyProps {
  title: string;
  type: string;
  icon: React.ReactNode;
  value?: string | number | Decimal | Date | null;
  readOnly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  className?: string;
}

export function Record_Property({
  title,
  type,
  icon,
  value,
  readOnly,
  register,
  className,
}: RecordPropertyProps) {
  return (
    <label htmlFor={title} className="Record_Property">
      <span className="icon">{icon}</span>
      <span className="tag">{title}</span>
      <Input
        id={title}
        type={type}
        autoComplete="off"
        readOnly={readOnly}
        className={cn("bg-background border-none rounded-l-none ", className)}
        defaultValue={value !== null || value === 0 ? value : ""}
        {...register}
      />
    </label>
  );
}
