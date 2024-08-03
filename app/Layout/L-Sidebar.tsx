"use client"
import { usePathname } from "next/navigation"
import useSidebarResizer from "../Hooks/useSidebarResizer"
import Plus from "../Assets/Icons/Plus"
import Search from "../Assets/Icons/Search"

export default function L_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [sideBarRef] = useSidebarResizer()
  const path = usePathname()

  return (
    <div {...props} ref={sideBarRef} className="L-Sidebar">
      <div className="tab-title">
        <span>{path.split("/")[1]}</span>
      </div>
      <div className="tools">
        <label htmlFor="RecordSearch" className="Search-Container">
          <Search />
          <input type="text" placeholder="Search" id="RecordSearch" />
        </label>
        <button className="Primary-Button">
          <Plus />
        </button>
      </div>

      <div className="content">{props.children}</div>
    </div>
  )
}
