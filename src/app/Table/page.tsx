"use client"

import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import { ColDef } from "ag-grid-community"
import { Table } from "@prisma/client"

export default function TransactionTable({ table }: { table: Table }) {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
    }
  }, [])

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "desc", editable: true },
    {
      field: "price",
      editable: true,
      cellRenderer: (params: { value: number }) => {
        if (
          params.value === undefined ||
          params.value === 0 ||
          params.value === null
        )
          return ""
        return `${params.value.toFixed(3)} BD`
      },
    },
    {
      field: "qty",
      editable: true,
      cellRenderer: (params: { value: number }) => {
        if (
          params.value === undefined ||
          params.value === 0 ||
          params.value === null
        )
          return ""
        return `${params.value}`
      },
    },
    {
      field: "total",
      valueGetter: (params: { data: { price: number; qty: number } }) => {
        return params.data.price * params.data.qty
      },
    },
  ])

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { desc: "", price: 0, qty: 1 },
    { desc: "", price: 0, qty: 1 },
    { desc: "", price: 0, qty: 1 },
  ])

  // Calculate the total of all totals
  // const Sum = rowData.reduce((acc, row) => acc + row.price * row.qty, 0)

  return (
    <div className="flex flex-col w-full h-full">
      <button className="inline-button">Add New Transaction</button>
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
