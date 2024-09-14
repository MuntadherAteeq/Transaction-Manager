"use client"

import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import { ColDef } from "ag-grid-community"

export default function TransactionTable(props: any) {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
    }
  }, [])

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "desc" },
    {
      field: "price",
      cellRenderer: (params: { value: any }) => {
        return `${params.value} BD `
      },
    },
    { field: "qty" },
    {
      field: "total",
      valueGetter: (params: { data: { price: number; qty: number } }) => {
        return params.data.price * params.data.qty
      },
    },
  ])

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { desc: "Tesla", price: 64950, qty: 3 },
    { desc: "Ford", price: 33850, qty: 1 },
    { desc: "Toyota", price: 29600, qty: 2 },
  ])

  // Calculate the total of all totals
  const totalSum = rowData.reduce((acc, row) => acc + row.price * row.qty, 0)

  // Footer Row Data
  const footerRowData = [
    {
      desc: "Total",
      price: "",
      qty: "",
      total: totalSum,
    },
  ]

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
