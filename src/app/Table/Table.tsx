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
  updateType,
} from "./table.actions"
import AddTransactionButton from "./TableOptions"
import TableFooter from "./TableFooter"

export default function TransactionTable({ table }: { table: Table }) {
  const [rowData, setRowData] = useState<Transaction[]>([])
  const [updatedTransaction, setUpdatedTransaction] =
    useState<Transaction | null>(null)

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
        editable: true,
        onCellValueChanged: async (params) => {
          if (params.oldValue !== params.newValue) {
            await updateDesc(params.data.id, params.newValue)
          }
        },
      },
      {
        field: "amount",
        filter: "agNumberColumnFilter",
        editable: true,
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
            const res = await updatePrice(params.data.id, params.data.amount)
            if (res.status !== 200) {
              fetchData()
            }
            setUpdatedTransaction({
              ...params.data,
              amount: params.data.amount,
            })
          }
        },
        cellRenderer: (params: { value: number }) => {
          const amount = Number(params.value)
          if (amount === 0 || amount === null || amount === undefined) return ""
          return `${params.value.toFixed(3)} BD`
        },
      },
      // {
      //   field: "type",
      //   cellEditor: "agSelectCellEditor",
      //   editable: true,
      //   cellEditorParams: {
      //     values: ["expense", "income"],
      //   },
      //   onCellValueChanged: async (params) => {
      //     if (params.data) {
      //       const res = await updateType(params.data.id, params.newValue)
      //       if (res.status !== 200) fetchData()
      //       setUpdatedTransaction({ ...params.data, type: params.newValue })
      //     }
      //   },
      // },
      {
        field: "qty",
        filter: "agNumberColumnFilter",
        editable: true,
        cellEditor: "agNumberCellEditor",
        onCellValueChanged: async (params) => {
          if (params.data) {
            const res = await updateQuantity(params.data.id, params.newValue)
            if (res.status !== 200) {
              fetchData()
            }
            setUpdatedTransaction({ ...params.data, qty: params.newValue })
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
    []
  )
  // const selection = useMemo(() => {
  //   return {
  //     mode: "multiRow",
  //     // checkboxes: false,
  //     headerCheckbox: false,
  //     // enableClickSelection: true,
  //   }
  // }, [])

  return (
    <div className="flex flex-col w-full h-full animate-show-down opacity-0">
      <AddTransactionButton tableId={table.id} onClick={fetchData} />
      <AgGridReact
        className="ag-theme-quartz-dark w-full h-full"
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
        overlayNoRowsTemplate="No Transactions Found"
      />
      <tfoot className="w-full  border-solid  rounded-b-[7px] p-1">
        <tr className="grid grid-cols-4 ">
          <td></td>
          <td></td>
          <td>Total : </td>
          <td className="px-[15px]">
            <TableFooter
              rowData={rowData}
              updatedTransaction={updatedTransaction}
            />
          </td>
        </tr>
      </tfoot>
    </div>
  )
}
