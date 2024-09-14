"use client"

import SignOutButton from "@/components/SignOutButton"
import { usePathname } from "next/navigation"
import { mutate } from "swr"

export default function TitleBar() {
  const activity = usePathname().split("/")[1]
  async function clearRecords() {
    try {
      const response = await fetch("/API/clear-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
      if (response.ok) mutate(`/API/records?activity=${activity}`)
    } catch (error) {
      console.error("Failed to clear records", error)
    }
  }

  return (
    <div className="Title-Bar">
      <div className="options">
        {/* <logo-blue /> */}
        <button className="inline-button" onClick={clearRecords}>
          Clear
        </button>
      </div>
      {/* <button className="search">
        <Search_Icon  />
        Search
      </button> */}
      <div className="actions">
        <SignOutButton>Sign Out</SignOutButton>
      </div>
    </div>
  )
}
