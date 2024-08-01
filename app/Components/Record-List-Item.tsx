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
        <Image src={avatar} id="avatar" alt="avatar" draggable="false" />
      </div>
      <div className="info-container">
        <div className="top">
          <div className="name">Muntadher Ahmed Ali Rhone Lorem, ipsum.</div>
        </div>
        <div className="bottom">
          <div className="date">2024</div>
          <div className="total">30.000 BD</div>
        </div>
      </div>
    </div>
  )
}
