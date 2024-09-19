import type { Record } from "@prisma/client"
import Avatar from "./Avatar"

export default function Record_item({
  record,
  animation,
}: {
  record: Record
  animation: string
}) {
  const data = record
  return (
    <div className={`Record-Item ${animation}`}>
      <div className="avatar-container">
        <Avatar id="avatar" draggable="false" />
      </div>
      <div className="info-container">
        <div className="top">
          <div className="name">{data.name}</div>
        </div>
        <div className="bottom">
          <div className="date">{`${new Date(
            data.createdAt
          ).toLocaleDateString()}`}</div>
        </div>
      </div>
    </div>
  )
}
