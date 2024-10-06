"use client"
import { SearchField } from "../../Layouts/L-Sidebar"
import AddRecord from "../AddRecord"
import Spinner from "../Spinner"
import Link from "next/link"
import Record_item from "./Record-Item"
import useSWR from "swr"
import { fetcher } from "../../Utils/common"
import { Record } from "@prisma/client"
import React, { useEffect } from "react"

export default function Record_List({ activity }: { activity: string }) {
  const { data: records, error } = useSWR<Record[]>(
    `/API/records?activity=${activity}`,
    fetcher
  )
  const [search, setSearch] = React.useState<Record[] | undefined>([])

  useEffect(() => {
    setSearch(records)
  }, [records])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target
    if (e.currentTarget.value === "") {
      searchInput.removeAttribute("value")
    }
    setSearch(
      records?.filter((record) =>
        record.name?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    )
  }

  return (
    <>
      {error ? (
        <div className="w-full flex relative items-center justify-center mt-8">
          <p className="text-2xl text-stone-500">Failed to load Records</p>
        </div>
      ) : (
        <>
          <div className="tools">
            <SearchField
              onChange={handleSearch}
              autoFocus={activity === "History"}
            />
            {(activity === "Archive" || activity === "Wallet") && (
              <AddRecord activity={activity} />
            )}
          </div>
          <ul>
            {!search ? (
              <Spinner />
            ) : Array.isArray(records) && records.length === 0 ? (
              <div className="w-full flex relative items-center justify-center">
                <p className="text-2xl text-stone-500">Empty</p>
              </div>
            ) : (
              search.map((record) => (
                <Link href={`/${activity}/${record.id}`} key={record.id}>
                  <Record_item record={record} />
                </Link>
              ))
            )}
          </ul>
        </>
      )}
    </>
  )
}
