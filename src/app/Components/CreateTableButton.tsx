"use client"
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
    <button className="inline-button" onClick={createNewTable}>
      Create new Table
    </button>
  )
}
