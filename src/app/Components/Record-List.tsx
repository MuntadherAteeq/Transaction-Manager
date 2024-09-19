"use client"
import { SearchField } from "../Layouts/L-Sidebar"
import AddButton from "./AddButton"
import Spinner from "./Spinner"
import Link from "next/link"
import Record_item from "./Record-Item"
import useSWR from "swr"
import { fetcher } from "../Utils/common"
import { Record } from "@prisma/client"

export default function Record_List({ activity }: { activity: string }) {
  const { data: records, error } = useSWR<Record[]>(
    `/API/records?activity=${activity}`,
    fetcher
  )

  return (
    <>
      {error ? (
        <div className="w-full flex relative items-center justify-center mt-8">
          <p className="text-2xl text-stone-500">Failed to load Records</p>
        </div>
      ) : (
        <>
          <div className="tools">
            <SearchField />
            <AddButton activity={activity} />
          </div>
          <ul>
            {!records ? (
              <Spinner />
            ) : Array.isArray(records) && records.length === 0 ? (
              <div className="w-full flex relative items-center justify-center">
                <p className="text-2xl text-stone-500">Empty</p>
              </div>
            ) : (
              records.map((record) => (
                <Link href={`/${activity}/${record.id}`} key={record.id}>
                  <Record_item record={record} animation={""} />
                </Link>
              ))
            )}
          </ul>
        </>
      )}
    </>
  )
}
