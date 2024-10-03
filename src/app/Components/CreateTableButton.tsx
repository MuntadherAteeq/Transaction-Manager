"use client"
import { Button } from "@/components/ui/button"
import { Table2 } from "lucide-react"
import { mutate } from "swr"

export default function CreateTableButton({
  recordId,
}: {
  recordId: number | undefined
}) {
  const createNewTable = async () => {
    const response = await fetch("/API/create-table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recordId }),
    })
    if (response.ok) {
      mutate(`/API/tables?recordId=${recordId}`)
    }
  }
  return (
    <Button
      variant={"ghost"}
      onClick={createNewTable}
      className="flex gap-2 sticky top-0 right-0 z-20  backdrop-blur-md border-[1px] border-gray-600"
    >
      <Table2 size={18} />
      <span>Create new Table</span>
    </Button>
  )
}
