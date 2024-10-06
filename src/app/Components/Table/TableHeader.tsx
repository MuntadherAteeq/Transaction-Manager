"use client"

import { addTransaction, deleteTransaction, dropTable } from "./table.actions"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Table, Transaction } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { mutate } from "swr"
import { markTableAsCompleted } from "./table.actions"

export default function TableHeader({
  table,
  onClick,
  selected,
  onPrint,
  setIsComplete,
}: {
  table: Table
  onClick: () => void
  selected?: Transaction[]
  onPrint?: () => void
  setIsComplete: (isComplete: boolean) => void
}) {
  const [count, setCount] = useState(0)
  const [inProgress, setInProgress] = useState(table.isCompleted)

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
          {!inProgress && (
            <>
              <Button
                className="bg-transparent hover:bg-background shadow-none"
                onClick={() => {
                  add()
                  onClick()
                }}
              >
                New
              </Button>
              <Button
                className="bg-transparent hover:bg-background shadow-none"
                onClick={onPrint}
              >
                Export
              </Button>
              {selected && selected.length > 0 && (
                <Button
                  className="bg-transparent hover:bg-background shadow-none hover:text-red-500"
                  onClick={async () => {
                    await deleteTransaction(selected)
                    onClick()
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                className="bg-transparent hover:bg-background shadow-none hover:text-red-500"
                onClick={async () => {
                  await dropTable(table.id)
                  mutate(`/API/tables?recordId=${table.recordId}`)
                }}
              >
                Drop
              </Button>
            </>
          )}
        </CardContent>

        <CardContent className="flex p-3 gap-2 items-center select-none">
          {inProgress ? (
            <Badge
              onClick={async () => {
                await markTableAsCompleted(table.id)
                setInProgress(!inProgress)
                setIsComplete((e) => !e)
              }}
              className="bg-foreground hover:bg-foreground text-background text-sm cursor-pointer transition-all"
            >
              Completed
            </Badge>
          ) : (
            <Badge
              onClick={async () => {
                await markTableAsCompleted(table.id)
                setInProgress(!inProgress)
                setIsComplete((e) => !e)
              }}
              className="bg-background hover:bg-background text-sm cursor-pointer transition-all"
            >
              In Progress
            </Badge>
          )}
        </CardContent>
      </div>
    </>
  )
}
