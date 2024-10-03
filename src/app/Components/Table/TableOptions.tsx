"use client"

import { useState } from "react"
import { addTransaction, deleteTransaction } from "./table.actions"
import React from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Table, Transaction } from "@prisma/client"
import { Switch } from "@/components/ui/switch"

export default function TableOptions({
  table,
  onClick,
  selected,
  onPrint,
}: {
  table: Table
  onClick: () => void
  selected?: Transaction[]
  onPrint?: () => void
}) {
  const [count, setCount] = useState(0)
  const [inProgress, setInProgress] = useState(false)

  async function add() {
    const res = await addTransaction(table.id)
    if (res.status === 200) {
      setCount(count + 1)
    }
  }

  return (
    <>
      <div className="bg-[#114565] rounded-t-xl rounded-b-none flex flex-row justify-between">
        <CardContent className="w-full p-3 flex-1">
          <Button
            className="bg-[#114565] hover:bg-background shadow-none"
            onClick={() => {
              add()
              onClick()
            }}
          >
            New
          </Button>
          <Button
            className="bg-[#114565] hover:bg-background shadow-none"
            onClick={onPrint}
          >
            Export
          </Button>
          {selected && selected.length > 0 && (
            <Button
              className="bg-[#114565] hover:bg-background shadow-none"
              onClick={async () => {
                await deleteTransaction(selected)
                onClick()
              }}
            >
              Delete
            </Button>
          )}
        </CardContent>

        <CardContent className="flex p-3  gap-2 items-center select-none">
          {inProgress ? <span>Completed</span> : <span>In Progress</span>}

          <Switch
            onClick={() => {
              onPrint && onPrint()
              setInProgress(!inProgress)
            }}
          />
        </CardContent>
      </div>
    </>
  )
}
