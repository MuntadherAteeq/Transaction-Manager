"use client"
import { usePathname } from "next/navigation"
import useSidebarResizer from "../Hooks/useSidebarResizer"

export default function L_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [sideBarRef] = useSidebarResizer()
  const path = usePathname()

  return (
    <div {...props} ref={sideBarRef} className="L-Sidebar">
      <div className="tab-title">
        <span>{path.split("/")[1]}</span>
      </div>
      <div className="content">{props.children}</div>
    </div>
  )
}
