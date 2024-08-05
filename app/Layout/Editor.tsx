import Button from "../Components/Button"
import avatar from "../Assets/Images/Avatar.png"
import Image from "next/image"

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Editor(props: DataTableProps) {
  return (
    <div {...props} className="Editor">
      <div className="Tab-Container">
        <div className="Tabs">
          <div className="Tab">
            <Image src={avatar} alt="avatar" />
            <p>Muntadher Ahmed Ateeq</p>
            <Button>X</Button>
          </div>
        </div>
      </div>
      <div className="Table-List">Hello</div>
    </div>
  )
}
