import { Transaction } from "@prisma/client"
import { useMemo } from "react"

export default function TableFooter({
  rowData,
  updatedTransaction,
}: {
  rowData: Transaction[]
  updatedTransaction: Transaction | null
}) {
  const total = useMemo(() => {
    return rowData.reduce((acc, { id, amount, qty, type }) => {
      let transactionAmount = amount * qty

      if (updatedTransaction && id === updatedTransaction.id) {
        transactionAmount = updatedTransaction.amount * updatedTransaction.qty
        type = updatedTransaction.type
      }

      if (type === "expense") {
        return acc - transactionAmount
      }
      return acc + transactionAmount
    }, 0)
  }, [rowData, updatedTransaction])

  return (
    <span>
      {total > 0 ? "+" : "-"} {Math.abs(total / 1000).toFixed(3)} BD
    </span>
  )
}
