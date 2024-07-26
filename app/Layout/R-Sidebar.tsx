"use client"
import useSidebarResize from "../Hooks/useSidebarResizer"

export default function R_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [ref] = useSidebarResize("right")
  return <div {...props} className="R-Sidebar" ref={ref}></div>
}
