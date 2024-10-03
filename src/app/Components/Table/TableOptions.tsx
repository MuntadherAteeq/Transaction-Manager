"use client"

import { addTransaction, deleteTransaction, dropTable } from "./table.actions"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Table, Transaction } from "@prisma/client"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { mutate } from "swr"

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
          <Button
            className="bg-[#114565] hover:bg-background shadow-none"
            onClick={async () => {
              await dropTable(table.id)
              mutate(`/API/tables?recordId=${table.recordId}`)
            }}
          >
            Drop
          </Button>
        </CardContent>

        <CardContent className="flex p-3 gap-2 items-center select-none">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Switch
                  onClick={() => {
                    onPrint && onPrint()
                    setInProgress(!inProgress)
                  }}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="p-0 bg-transparent">
                {inProgress ? (
                  <Badge className="bg-foreground hover:bg-foreground text-background ">
                    Completed
                  </Badge>
                ) : (
                  <Badge className="bg-background hover:bg-background">
                    In Progress
                  </Badge>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </div>
    </>
  )
}
