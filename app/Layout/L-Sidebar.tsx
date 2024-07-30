"use client"
import { usePathname } from "next/navigation"
import useSidebarResizer from "../Hooks/useSidebarResizer"
import { useLayoutEffect, useState } from "react"

export default function L_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setOpen] = useState(true)
  const [sideBarRef] = useSidebarResizer()
  const path = usePathname()

  return (
    <div {...props} ref={sideBarRef} className="L-Sidebar">
      <div className="tab-title">
        <span>{path.split("/")[1]}</span>
      </div>
      <div className="content"></div>
    </div>
  )
}
