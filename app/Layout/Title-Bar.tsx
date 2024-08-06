"use client"
import Button from "../Components/Button"

interface PropsType extends React.HTMLAttributes<HTMLDivElement> {}
export default function TitleBar(props: PropsType) {
  async function clearRecords() {
    try {
      const response = await fetch("/api/clear-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
    } catch (error) {
      console.error("Failed to clear records", error)
    }
  }

  return (
    <div className="Title-Bar">
      <div className="options">
        {/* <logo-blue /> */}
        <Button>New</Button>
        <Button onClick={clearRecords}>Clear</Button>
      </div>
      <button className="search">
        {/* <icon-search /> */}
        Search
      </button>
      <div className="actions">
        {/* <icon-minus /> */}
        {/* <icon-square /> */}
        {/* <icon-x /> */}
      </div>
    </div>
  )
}
