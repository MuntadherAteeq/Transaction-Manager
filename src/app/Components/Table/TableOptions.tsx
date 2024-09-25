"use client"
import { useState } from "react"
import { addTransaction, clearTransactions } from "./table.actions"
import { PlusIcon } from "@radix-ui/react-icons"

export default function TableOptions({
  tableId,
  onClick,
}: {
  tableId: number
  onClick: () => void
}) {
  const [count, setCount] = useState(0)

  async function add() {
    const res = await addTransaction(tableId)
    if (res.status === 200) {
      setCount(count + 1)
    }
  }

  async function clear() {
    await clearTransactions(tableId)
  }

  return (
    <div className="flex flex-row gap-2">
      <button
        className="flex items-center inline-button !bg-background"
        onClick={() => {
          add()
          onClick()
        }}
      >
        <PlusIcon className="m-1" />
        New
      </button>
      <button
        className="inline-button !bg-background"
        onClick={() => {
          clear()
          onClick()
        }}
      >
        Clear
      </button>
    </div>
  )
}
