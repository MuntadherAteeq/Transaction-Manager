"use client"
import useSidebarResize from "../Hooks/useSidebarResizer"

export default function R_Sidebar(props: any) {
  const [ref] = useSidebarResize("right")

  return (
    <div className="R-Sidebar" ref={ref}>
      <div className="Tab-Container"></div>
      <div className="content">{props.children}</div>
    </div>
  )
}
