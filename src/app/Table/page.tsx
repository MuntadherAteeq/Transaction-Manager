"use client"

import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useState, useCallback } from "react"
import { ColDef } from "ag-grid-community"
import { Table, Transaction } from "@prisma/client"
import {
  getTransactions,
  updateDesc,
  updatePrice,
  updateQuantity,
} from "./table.actions"
import AddTransactionButton from "./TableOptions"

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

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "description",
        editable: true,
        onCellValueChanged: async (params) => {
          if (params.oldValue !== params.newValue) {
            await updateDesc(params.data.id, params.newValue)
          }
        },
      },
      {
        field: "amount",
        editable: true,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: { showStepperButtons: false },
        valueGetter: (params: { data: { amount: number } }) => {
          return params.data.amount / 1000
        },
        valueSetter: (params: {
          data: { amount: number }
          newValue: number
        }) => {
          params.data.amount = Number((params.newValue * 1000).toFixed(0))
          return true
        },

        onCellValueChanged: async (params) => {
          const res = await updatePrice(params.data.id, params.data.amount)
          res.status !== 200 ? fetchData() : null
        },
        cellRenderer: (params: { value: number }) => {
          const amount = Number(params.value)
          if (amount === 0 || amount === null || amount === undefined) return ""
          return `${params.value.toFixed(3)} BD`
        },
      },
      {
        field: "qty",
        editable: true,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: { showStepperButtons: false },
        onCellValueChanged: async (params) => {
          await updateQuantity(params.data.id, params.newValue)
        },
        cellRenderer: (params: { value: number }) => {
          const qty = Number(params.value)
          if (qty === 0 || qty === null || qty === undefined) return ""
          return params.value
        },
      },
      {
        field: "total",
        valueGetter: (params: { data: { amount: number; qty: number } }) => {
          return `${((params.data.amount / 1000) * params.data.qty).toFixed(
            3
          )} BD`
        },
      },
    ],
    []
  )
  return (
    <div className="flex flex-col w-full h-full">
      <AddTransactionButton tableId={table.id} onClick={fetchData} />
      <AgGridReact
        className="ag-theme-quartz-dark w-full h-full"
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
        // selection={selection}
      />
    </div>
  )
}
