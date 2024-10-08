"use client"

import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { ColDef, SelectionChangedEvent } from "ag-grid-community"
import { Table, Transaction } from "@prisma/client"
import {
  getTransactions,
  updateDesc,
  updatePrice,
  updateQuantity,
  updateType,
} from "./table.actions"
import AddTransactionButton from "./TableHeader"

export default function Tracker({ table }: { table: Table }) {
  const [selected, setSelected] = useState<Transaction[]>([])
  const [rowData, setRowData] = useState<Transaction[]>([])
  const [isComplete, setIsComplete] = useState(table.isCompleted)

  useEffect(() => {}, [])

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
        filter: "agTextColumnFilter",
        editable: !isComplete,
        onCellValueChanged: async (params) => {
          if (params.oldValue !== params.newValue) {
            await updateDesc(params.data.id, params.newValue)
          }
        },
      },
      {
        field: "amount",
        filter: "agNumberColumnFilter",
        editable: !isComplete,
        cellEditor: "agNumberCellEditor",
        valueGetter: (params: { data: { amount: number } }) => {
          return params.data?.amount ? params.data.amount / 1000 : 0
        },
        valueSetter: (params: {
          data: { amount: number }
          newValue: number
        }) => {
          if (params.data) {
            params.data.amount = Number((params.newValue * 1000).toFixed(0))
            return true
          }
          return false
        },
        onCellValueChanged: async (params) => {
          if (params.data) {
            await updatePrice(params.data.id, params.data.amount)
            fetchData()
          }
        },
        cellRenderer: (params: { value: number }) => {
          const amount = Number(params.value)
          if (amount === 0 || amount === null || amount === undefined) return ""
          return `${params.value.toFixed(3)} BD`
        },
      },
      {
        field: "type",
        cellEditor: "agSelectCellEditor",
        editable: !isComplete,
        cellEditorParams: {
          values: ["expense", "income"],
        },
        onCellValueChanged: async (params) => {
          if (params.data) {
            const res = await updateType(params.data.id, params.newValue)
            if (res.status !== 200) fetchData()
          }
        },
      },
      {
        field: "qty",
        filter: "agNumberColumnFilter",
        editable: !isComplete,
        cellEditor: "agNumberCellEditor",
        onCellValueChanged: async (params) => {
          if (params.data) {
            await updateQuantity(params.data.id, params.newValue)
            fetchData()
          }
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
          if (params.data?.amount && params.data?.qty) {
            return `${((params.data.amount / 1000) * params.data.qty).toFixed(
              3
            )} BD`
          }
          return "0.000 BD"
        },
      },
    ],
    [isComplete]
  )
  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    }
  }, [])

  const handleSelectedRows = (event: SelectionChangedEvent) => {
    setSelected(event.api.getSelectedRows())
  }

  const gridRef = useRef<AgGridReact>(null)

  const onPrint = useCallback(() => {
    // Print selected transactions
    if (gridRef.current) {
      // const gridApi: GridApi = gridRef.current.api
      // const csv = gridApi.getDataAsCsv()
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-full animate-show-down opacity-0 mb-9">
      <AddTransactionButton
        table={table}
        onClick={fetchData}
        selected={selected}
        onPrint={onPrint}
        setIsComplete={setIsComplete}
      />
      <div className="table-container">
        {" "}
        {/* Add this div */}
        <AgGridReact
          className="ag-theme-quartz-dark w-full"
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={defaultColDef}
          overlayNoRowsTemplate="No Transactions Found"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          selection={!isComplete ? rowSelection : undefined}
          onSelectionChanged={handleSelectedRows}
          ref={gridRef}
        />
      </div>
      <tfoot className="w-full  border-solid  rounded-b-[7px] p-1 bg-[#114565] z-10">
        <tr className="grid grid-cols-4 ">
          <td className="flex justify-center">Total income:</td>
          <td className="text-green-500">
            {(
              rowData.reduce((acc, { amount, qty, type }) => {
                if (type === "income") {
                  return acc + amount * qty
                }
                return acc
              }, 0) / 1000
            ).toFixed(3) + " BD"}
          </td>
          <td className="flex justify-center">Total Expenses: </td>
          <td className=" text-red-500">
            {(
              rowData.reduce((acc, { amount, qty, type }) => {
                if (type === "expense") {
                  return acc + amount * qty
                }
                return acc
              }, 0) / 1000
            ).toFixed(3) + " BD"}
          </td>
        </tr>
      </tfoot>
    </div>
  )
}
