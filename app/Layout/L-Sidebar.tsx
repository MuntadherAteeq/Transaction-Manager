"use client"
import { usePathname } from "next/navigation"
import useSidebarResizer from "../Hooks/useSidebarResizer"
import Search from "../Assets/Icons/Search"
import { ChangeEvent, useState } from "react"
import AddButton from "../Components/AddButton"

export default function L_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [sideBarRef] = useSidebarResizer()
  const path = usePathname()

  return (
    <div {...props} ref={sideBarRef} className="L-Sidebar">
      <div className="tab-title">
        <span>{path.split("/")[1]}</span>
      </div>
      <div className="tools">
        <SearchField />
        <AddButton />
      </div>
      <div className="content">{props.children}</div>
    </div>
  )
}



export function SearchField() {
  const [search, setSearch] = useState("")

  function handleSearchBox(e: ChangeEvent<HTMLInputElement>): void {
    const searchInput = e.target
    if (e.currentTarget.value === "") {
      searchInput.removeAttribute("value")
    }
    setSearch(e.currentTarget.value)
  }
  return (
    <label htmlFor="RecordSearch" className="Search-Container">
      <Search />
      <input
        type="text"
        placeholder="Search"
        id="RecordSearch"
        onChange={(e) => handleSearchBox(e)}
        {...(search !== "" ? { value: search } : {})}
      />
    </label>
  )
}
