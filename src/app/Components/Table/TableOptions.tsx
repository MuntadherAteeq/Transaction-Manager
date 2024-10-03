"use client"

import { useState } from "react"
import { addTransaction, clearTransactions } from "./table.actions"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Transaction } from "@prisma/client"

export default function TableOptions({
  tableId,
  onClick,
  selected,
}: {
  tableId: number
  onClick: () => void
  selected?: Transaction[]
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
  async function deleteSelected() {
    await clearTransactions(tableId)
  }

  return (
    <>
      <div className="bg-background rounded-t-xl rounded-b-none ">
        <CardContent className="p-3">
          <Card className="bg-background border-card p-1">
            <Button
              onClick={() => {
                add()
                onClick()
              }}
            >
              New
            </Button>
            <Button
              onClick={() => {
                clear()
                onClick()
              }}
            >
              Clear
            </Button>
            {selected && selected.length > 0 && (
              <Button
                onClick={() => {
                  deleteSelected()
                  onClick()
                }}
              >
                Delete
              </Button>
            )}
            <Button>Search</Button>
          </Card>
        </CardContent>
      </div>
    </>
  )
}
