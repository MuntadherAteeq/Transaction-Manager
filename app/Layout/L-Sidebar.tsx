"use client"
import useSidebarResizer from "../Hooks/useSidebarResizer"
import { useLayoutEffect, useState } from "react"

export default function L_Sidebar(props: React.HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setOpen] = useState(true)
  const [sideBarRef] = useSidebarResizer()
  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 800) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])
  return (
    <div
      {...props}
      ref={sideBarRef}
      className="L-Sidebar"
      style={{
        width: isOpen ? "0" : "0",
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className="tab-title">
        <span>inbox</span>
      </div>
      <div className="content">{props.children}</div>
    </div>
  )
}
