"use client"
import useSWR from "swr"
import Record_List_item from "../Components/Record-List-Item"
import L_Sidebar, { SearchField } from "../Layouts/L-Sidebar"
import AddButton from "../Components/AddButton"
import Spinner from "../Components/Spinner"
import { usePathname } from "next/navigation"
import Link from "next/link"
import ActivityBar from "../Layouts/ActivityBar"
import TitleBar from "../Layouts/Title-Bar"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function RecordList(props: any) {
  const { data: records, error } = useSWR(
    `/API/records?activity=${props.params.activity}`,
    fetcher
  )
  const path = usePathname()
  const activity = path.split("/")[1] // Extract the current activity from the path

  return (
    <>
      <TitleBar />
      <div className="App-Container">
        <ActivityBar />
        <L_Sidebar>
          {error ? (
            <div className="w-full flex relative items-center justify-center mt-8">
              <p className="text-2xl text-stone-500">Failed to load Records</p>
            </div>
          ) : (
            <>
              <div className="tools">
                <SearchField />
                <AddButton />
              </div>
              <ul>
                {!records ? (
                  <Spinner />
                ) : Array.isArray(records) && records.length === 0 ? (
                  <div className="w-full flex relative items-center justify-center">
                    <p className="text-2xl text-stone-500">Empty</p>
                  </div>
                ) : (
                  records.map((record: any) => (
                    <Link href={`/${activity}/${record.id}`} key={record.id}>
                      <Record_List_item record={record} />
                    </Link>
                  ))
                )}
              </ul>
            </>
          )}
        </L_Sidebar>
        {props.children}
      </div>
    </>
  )
}
