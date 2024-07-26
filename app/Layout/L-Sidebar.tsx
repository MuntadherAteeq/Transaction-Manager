"use client"
import DealItem from "../Components/DealListItem"
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
      <div className="content">
        <DealItem />
      </div>
    </div>
  )
}

// export function sidebar_resize(
//   sidebar: HTMLElement,
//   location: "left" | "right" = "right"
// ) {
//   const resizer = document.createElement("hr")
//   resizer.classList.add("handle")

//   if (location === "left") {
//     resizer.style.right = `-3px`
//   } else {
//     resizer.style.left = `-3px`
//   }

//   const sidebarRect = sidebar.getBoundingClientRect()
//   const bodyRect = document.body.getBoundingClientRect()
//   const onMouseMove = (e: MouseEvent) => {
//     console.log("mousemove")

//     let size
//     if (location === "left") {
//       size = e.x - sidebarRect.left
//     } else {
//       size = -1 * (e.x - bodyRect.width)
//     }
//     if (size < 600) {
//       sidebar.style.flexBasis = `${size}px`
//     }
//   }
//   const onMouseUp = () => {
//     console.log("mouseup")
//     document.body.style.cursor = "unset"
//     resizer.classList.remove("active")
//     document.removeEventListener("mousemove", onMouseMove, false)
//   }
//   const onMouseDown = () => {
//     console.log("mousedown")
//     document.body.style.cursor = "e-resize"
//     resizer.classList.add("active")
//     document.addEventListener("mousemove", onMouseMove, false)
//     document.addEventListener("mouseup", onMouseUp, false)
//   }

//   resizer.addEventListener("mousedown", onMouseDown, false)

//   sidebar.appendChild(resizer)
//   return onMouseDown
// }
