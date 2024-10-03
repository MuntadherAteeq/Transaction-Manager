"use client"

import { useState } from "react"
import { addTransaction, clearTransactions } from "./table.actions"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

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
    <>
      <div className="bg-background rounded-t-xl rounded-b-none ">
        <CardContent className="p-3">
          <Card className="bg-background p-1">
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
          </Card>
        </CardContent>
      </div>
    </>
  )
}
