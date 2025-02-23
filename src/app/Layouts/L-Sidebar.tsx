"use client"
import { usePathname } from "next/navigation"
import useSidebarResizer from "../Hooks/useSidebarResizer"
import Search_Icon from "../Assets/Icons/Search"
import React, { ChangeEvent, useState } from "react"

export default function L_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [sideBarRef] = useSidebarResizer()
  const path = usePathname()

  return (
    <div {...props} ref={sideBarRef} className="L-Sidebar">
      <div className="tab-title">
        <span>{path?.split("/")[1]}</span>
      </div>
      <div className="content">{props.children}</div>
    </div>
  )
}

export function SearchField(props: React.HTMLAttributes<HTMLInputElement>) {
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
      <Search_Icon />
      <input
        type="text"
        placeholder="Search"
        id="RecordSearch"
        onChange={(e) => handleSearchBox(e)}
        {...(search !== "" ? { value: search } : {})}
        {...props}
      />
    </label>
  )
}
