import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Table, Transaction } from "@prisma/client"
import { useMemo, useState } from "react"

export default function TableFooter({
  rowData,
  updatedTransaction,
}: {
  rowData: Transaction[]
  updatedTransaction: Transaction | null
  table?: Table
}) {
  const [paid, setPaid] = useState<string>("")
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

  const handleKeyPressed = (e) => {
    if (e?.keyCode === 13) {
      e.target.blur()
      alert("Enter Pressed")
    }
  }
  const setPaidAmount = async (price: string) => {
    if (Number.isNaN(Number(price)))
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        duration: 2000,
      })
  }

  return (
    <tfoot className="w-full  border-solid  rounded-b-[7px] p-1 bg-[#114565] z-10">
      <tr className="grid grid-cols-4">
        <td></td>
        <td></td>
        <td className="text-right">Total : </td>
        <td className="px-[15px]">
          <span>
            {total > 0 ? "+" : "-"} {Math.abs(total / 1000).toFixed(3)} BD
          </span>
        </td>
      </tr>
      <tr className="grid grid-cols-4 ">
        <td></td>
        <td></td>
        <td className="text-right">Paid : </td>
        <td className="px-[15px]">
          <span>
            <Input
              type="number"
              className="bg-background [&::-webkit-inner-spin-button]:appearance-none"
              onKeyDown={handleKeyPressed}
              onBlur={(e) => setPaidAmount(e.target.value)}
              onChange={(e) =>
                setPaid((price) => (price == "0" ? "" : e.target.value))
              }
              value={paid}
            />
          </span>
        </td>
      </tr>
    </tfoot>
  )
}
