import avatar from "../Assets/Images/Avatar.png"
import Image from "next/image"
interface Record_Item_Props extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string
  name?: string
  date?: string
  total?: string
}
export default function Record_List_item(props: Record_Item_Props) {
  return (
    <div {...props} className="Deal-Item">
      <div className="avatar-container">
        <Image
          src={avatar}
          id="avatar"
          alt="avatar"
          draggable="false"
          priority={true}
        />
      </div>
      <div className="info-container">
        <div className="top">
          <div className="name">{props.name}</div>
        </div>
        <div className="bottom">
          <div className="date">
            {props.date && new Date(props.date).toLocaleDateString()}
          </div>
          <div className="total">{props.total} BD</div>
        </div>
      </div>
    </div>
  )
}
