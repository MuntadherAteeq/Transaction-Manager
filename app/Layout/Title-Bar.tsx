"use client"
import Button from "../Components/Button"

interface PropsType extends React.HTMLAttributes<HTMLDivElement> {}
export default function TitleBar(props: PropsType) {
  return (
    <div className="Title-Bar">
      <div className="options">
        {/* <logo-blue /> */}
        <Button>New</Button>
        <Button>Clear</Button>
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
