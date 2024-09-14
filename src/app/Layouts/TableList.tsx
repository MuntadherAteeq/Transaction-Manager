"use client"
import { Table } from "@prisma/client"
import TransactionTable from "../Table/page"
import useSWR from "swr"
import { usePathname } from "next/navigation"
import Spinner from "../Components/Spinner"

let fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function TableList() {
  const id = usePathname().split("/")[2]
  const api = `/API/tables?recordId=${id}`
  const { data: tables, error, mutate } = useSWR(api, fetcher)
  console.log(tables)
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
