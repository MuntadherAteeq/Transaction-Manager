"use client"
import { Table } from "@prisma/client"
import TransactionTable from "../Components/Table/ArchiveTable"
import useSWR from "swr"
import { usePathname } from "next/navigation"
import Spinner from "../Components/Spinner"
import { fetcher } from "../Utils/common"

export default function TableList() {
  const id = usePathname().split("/")[2]
  const api = `/API/tables?recordId=${id}`
  const { data: tables, error } = useSWR(api, fetcher)
  return (
    <>
      {error ? (
        <div className="w-full flex relative items-center justify-center mt-8">
          <p className="text-2xl text-stone-500">Failed to load Tables</p>
        </div>
      ) : (
        <>
          {!tables ? (
            <Spinner />
          ) : Array.isArray(tables) && tables.length === 0 ? (
            <div className="w-full flex relative items-center justify-center mt-8">
              <p className="text-2xl text-stone-500">Empty</p>
            </div>
          ) : (
            tables.map((table: Table) => (
              <TransactionTable key={table.id} table={table} />
            ))
          )}
        </>
      )}
    </>
  )
}
