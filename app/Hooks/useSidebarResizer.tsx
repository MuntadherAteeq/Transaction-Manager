import { useLayoutEffect, useRef, useState } from "react"
const useSidebarResize = (
  location: "left" | "right" = "left",
  className: string = "handle"
) => {
  const sidebarRef = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current as unknown as HTMLElement
    if (!sidebar) return
    setWidth(sidebar.getBoundingClientRect().width)

    // create hr element to use as resizer with class handle and styling
    const resizer = document.createElement("hr")
    if (className === "handle") {
      resizer.style.position = "absolute"
      resizer.style.height = "100%"
      resizer.style.width = "6px"
      resizer.style.cursor = "e-resize"
      resizer.style.border = "none"
      resizer.style.zIndex = "100"
    }
    resizer.classList.add(className)

    // set the resizer to the correct side of the sidebar
    if (location === "left") {
      resizer.style.right = "-3px"
    } else {
      resizer.style.left = "-3px"
    }

    // add event listeners for mousemove and mouseup
    const onMouseMove = (e: MouseEvent) => {
      const sidebarRect = sidebar.getBoundingClientRect()
      const bodyRect = document.body.getBoundingClientRect()

      let size
      if (location === "left") {
        size = e.x - sidebarRect.left
      } else {
        size = -1 * (e.x - bodyRect.width)
      }

      if (size < 600) {
        sidebar.style.flexBasis = `${size}px`
      }
    }

    // remove event listeners and reset cursor
    const onMouseUp = () => {
      document.body.style.cursor = "unset"
      resizer.classList.remove("active")
      document.removeEventListener("mousemove", onMouseMove, false)
      setWidth(sidebar.getBoundingClientRect().width)
      sidebar.style.width = `${width}px`
    }

    const onMouseDown = () => {
      document.body.style.cursor = "e-resize"
      resizer.classList.add("active")
      document.addEventListener("mousemove", onMouseMove, false)
      document.addEventListener("mouseup", onMouseUp, false)
    }

    resizer.addEventListener("mousedown", onMouseDown, false)

    sidebar.appendChild(resizer)

    return () => {
      resizer.removeEventListener("mousedown", onMouseDown, false)
      document.removeEventListener("mousemove", onMouseMove, false)
      document.removeEventListener("mouseup", onMouseUp, false)
    }
  }, [location])

  return [sidebarRef]
}

export default useSidebarResize
