import avatar from "../Assets/Images/Avatar.png"
import Image from "next/image"
import type { Record } from "@prisma/client"

export default function Record_item({ record }: { record: Record }) {
  const data = record
  return (
    <div className="Deal-Item">
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
          <div className="name">{data.name}</div>
        </div>
        <div className="bottom">
          <div className="date">{`${new Date(
            data.createdAt
          ).toLocaleDateString()}`}</div>
          <div className="total">{`${data.total} BD`}</div>
        </div>
      </div>
    </div>
  )
}
