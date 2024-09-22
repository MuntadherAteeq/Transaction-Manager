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
    return rowData.reduce((acc, { id, amount, qty }) => {
      if (updatedTransaction && id === updatedTransaction.id) {
        return acc + updatedTransaction.amount * updatedTransaction.qty
      }
      return acc + amount * qty
    }, 0)
  }, [rowData, updatedTransaction])

  return <span>{Math.abs(total / 1000).toFixed(3)} BD</span>
}
