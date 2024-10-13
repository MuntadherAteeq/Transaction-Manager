"use client"

import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { ColDef, GridApi, SelectionChangedEvent } from "ag-grid-community"
import { Table, Transaction } from "@prisma/client"
import {
  // addTransaction,
  // deleteTransaction,
  // dropTable,
  getTransactions,
  updateDesc,
  updatePrice,
  updateQuantity,
  updateType,
} from "../Table/table.actions"
// import { CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { usePathname } from "next/navigation"
// import { mutate } from "swr"
// import ComingSoon from "../CommingSoon"
import TableHeader from "../Table/TableHeader"
import { toast } from "@/hooks/use-toast"

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
        filter: "agTextCellEditor",
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
            const res = await updatePrice(params.data.id, params.data.amount)
            if (res.error) {
              toast({
                title: "Error Happened",
                description: res.error,
              })
              fetchData()
            }
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
            if (res.error) {
              toast({
                title: "Error Happened",
                description: res.error,
              })
              fetchData()
            }
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
            const res = await updateQuantity(params.data.id, params.newValue)
            if (res.error) {
              toast({
                title: "Error Happened",
                description: res.error,
              })
              fetchData()
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (gridRef.current) {
      const gridApi: GridApi = gridRef.current.api
      if (selected.length > 0) {
        gridApi.exportDataAsCsv({
          onlySelected: true,
        })
      } else gridApi.exportDataAsCsv()
    }
  }, [selected])

  return (
    <div className="flex flex-col w-full h-full animate-show-down opacity-0 mb-9">
      <TableHeader
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
      <TrackerFooter rowData={rowData} />
    </div>
  )
}

export function TrackerFooter({ rowData }: { rowData: Transaction[] }) {
  return (
    <>
      <tfoot className="w-full  border-solid  rounded-b-[7px] p-1 bg-[#114565] z-10">
        <tr className="grid grid-cols-4">
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
        <tr className="grid grid-cols-4">
          <td className="flex justify-center">Balance :</td>
          <td className="text-blue-500">
            {(
              rowData.reduce((acc, { amount, type, qty }) => {
                if (type === "income") {
                  return acc + amount * qty
                }
                return acc - amount * qty
              }, 0) / 1000
            ).toFixed(3) + " BD"}
          </td>
          <td className="flex justify-center"></td>
          <td className=""></td>
        </tr>
      </tfoot>
    </>
  )
}

// function TrackerHeader({
//   table,
//   onClick,
//   selected,
//   onPrint,
// }: {
//   table: Table
//   onClick: () => void
//   selected?: Transaction[]
//   onPrint?: () => void
//   setIsComplete: (isComplete: boolean | ((e: boolean) => boolean)) => void
// }) {
//   const [count, setCount] = useState(0)
//   const activity = usePathname().split("/")[1]

//   async function add() {
//     const res = await addTransaction(table.id)
//     if (res.status === 200) {
//       setCount(count + 1)
//     }
//   }
//   return (
//     <>
//       <div className="bg-[#114565] rounded-t-xl rounded-b-none flex flex-row justify-between">
//         <CardContent className="w-full p-3 flex-1">
//           <Button
//             className="bg-transparent hover:bg-background shadow-none"
//             onClick={() => {
//               add()
//               onClick()
//             }}
//           >
//             New
//           </Button>

//           {selected && selected.length > 0 && (
//             <Button
//               className="bg-transparent hover:bg-background shadow-none hover:text-red-500"
//               onClick={async () => {
//                 await deleteTransaction(selected)
//                 onClick()
//               }}
//             >
//               Delete
//             </Button>
//           )}
//           <Button
//             className="bg-transparent hover:bg-background shadow-none hover:text-red-500"
//             onClick={async () => {
//               await dropTable(table.id)
//               mutate(
//                 `/API/tables?recordId=${table.recordId}&activity=${activity}`
//               )
//             }}
//           >
//             Drop
//           </Button>
//           <ComingSoon>
//             <Button
//               className="bg-transparent hover:bg-background shadow-none"
//               onClick={onPrint}
//             >
//               Export
//             </Button>
//           </ComingSoon>
//         </CardContent>
//         <CardContent className="flex p-3 gap-2 items-center select-none"></CardContent>
//       </div>
//     </>
//   )
// }
