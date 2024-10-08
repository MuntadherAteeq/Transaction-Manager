import { toast } from "@/hooks/use-toast"
import React from "react"

export default function ComingSoon({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <button
        onClick={() => {
          toast({
            title: "Coming Soon",
            description: "This feature is not yet available. Stay tuned!",
            duration: 2000,
          })
        }}
      >
        {children}
      </button>
    </>
  )
}
