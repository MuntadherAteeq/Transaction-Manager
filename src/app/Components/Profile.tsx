"use client"
import type { Record } from "@prisma/client"
import { Record_Property } from "./Record-Property"
import Phone_Icon from "../Assets/Icons/Phone"
import Calender_Icon from "../Assets/Icons/Calender"
import Email_Icon from "../Assets/Icons/Email"
import Info_Icon from "../Assets/Icons/info"
import { ReactNode, useMemo, useState } from "react"
import { Trash_Icon } from "../Assets/Icons/Trash"
import Done_Icon from "../Assets/Icons/Done"
import { Settings_Icon } from "../Assets/Icons/Settings"
import Export_Icon from "../Assets/Icons/Export"
import Avatar from "./Avatar"
import { HomeIcon } from "@radix-ui/react-icons"

export default function Profile({ record }: { record: Record }) {
  const [name, setName] = useState(record.name)
  const keys = useMemo(
    () => ["phone", "balance", "email", "desc", "address", "category"],
    []
  )

  const iconMap: { [key: string]: JSX.Element } = {
    phone: <Phone_Icon />,
    date: <Calender_Icon />,
    email: <Email_Icon />,
    desc: <Info_Icon />,
    address: <HomeIcon />,
  }

  const GetIcon = (type: string): ReactNode => {
    return iconMap[type] || <></>
  }

  const recordEntries = useMemo(() => {
    return Object.entries(record).filter(([key]) => keys.includes(key))
  }, [keys, record])

  return (
    <div className="Profile ">
      <div className="top">
        <div className="header">
          <Avatar />
          <input
            id="Name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name?.toString()}
          />
        </div>
        {recordEntries.map(([key, value]) => (
          <Record_Property
            icon={GetIcon(key)}
            key={key}
            title={key}
            type="text"
            value={value}
          />
        ))}
      </div>
      <div id="options">
        <Option icon={<Done_Icon />} color="blue">
          Finish
        </Option>
        <Option icon={<Settings_Icon />} color="gray">
          Edit
        </Option>
        {/* // TODO: Develop I Export function  */}
        <Option icon={<Export_Icon />} color="green">
          Export
        </Option>
        <Option icon={<Trash_Icon />} color="red">
          Delete
        </Option>
      </div>
    </div>
  )
}

export function Option({
  color,
  children,
  icon,
}: {
  color?: string
  children?: ReactNode
  icon?: ReactNode
}) {
  return (
    <button className={`option ${color}`}>
      <span className="icon">{icon}</span>
      <span>{children}</span>
    </button>
  )
}
