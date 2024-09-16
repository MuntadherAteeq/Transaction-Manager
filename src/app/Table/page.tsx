"use client"

import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useState, useCallback } from "react"
import { ColDef } from "ag-grid-community"
import { Table, Transaction } from "@prisma/client"
import { getTransactions, updateDesc, updatePrice } from "./table.actions"
import AddTransactionButton from "./AddTransactionButton"

export default function TransactionTable({ table }: { table: Table }) {
  const [rowData, setRowData] = useState<Transaction[]>([])

  const fetchData = useCallback(async () => {
    const result = await getTransactions(table.id)
    setRowData(result.data)
  }, [table.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
    }),
    []
  )

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "description",
        editable: true,
        onCellValueChanged: async (params) => {
          if (params.oldValue !== params.newValue) {
            const res = await updateDesc(params.data.id, params.newValue)
            res.status !== 200 ? alert("Failed to update price") : null
          }
        },
      },
      {
        field: "amount",
        editable: true,
        onCellValueChanged: async (params) => {
          if (params.oldValue !== params.newValue) {
            const res = await updatePrice(
              params.data.id,
              Number(params.newValue)
            )
            res.status !== 200 ? alert("Failed to update price") : null
            return Number(params.newValue)
          }
        },
        cellRenderer: (params: { value: number }) => {
          if (!params.value) return ""
          return `${Number(params.value).toFixed(3)} BD`
        },
      },
      {
        field: "qty",
        editable: true,
        cellRenderer: (params: { value: number }) => {
          if (!params.value) return ""
          return `${params.value}`
        },
      },
      {
        field: "total",
        valueGetter: (params: { data: { amount: number; qty: number } }) => {
          return `${(params.data.amount * params.data.qty).toFixed(3)} BD`
        },
      },
    ],
    []
  )

  // Calculate the total of all totals
  // const Sum = rowData.reduce((acc, row) => acc + row.price * row.qty, 0)

  return (
    <div className="flex flex-col w-full h-full">
      <AddTransactionButton tableId={table.id} />
      <AgGridReact
        className="ag-theme-quartz-dark w-full h-full"
        rowData={rowData}
        columnDefs={colDefs}
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
      />
    </div>
  )
}
