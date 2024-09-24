"use client"
import type { Record } from "@prisma/client"
import { Record_Property } from "../Record-Property"
import Phone_Icon from "../../Assets/Icons/Phone"
import Calender_Icon from "../../Assets/Icons/Calender"
import Email_Icon from "../../Assets/Icons/Email"
import Info_Icon from "../../Assets/Icons/info"
import { ReactNode, useMemo, useState } from "react"
import { Trash_Icon } from "../../Assets/Icons/Trash"
import Done_Icon from "../../Assets/Icons/Done"
import { Settings_Icon } from "../../Assets/Icons/Settings"
import Export_Icon from "../../Assets/Icons/Export"
import Avatar from "../Avatar"
import { HomeIcon } from "@radix-ui/react-icons"
import { DeleteRecordAlert } from "../Alert/DeleteRecordAlert"
import { Button } from "@/components/ui/button"

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
        <Button>
          <Option icon={<Done_Icon />}>Finish</Option>
        </Button>
        <Button>
          <Option icon={<Settings_Icon />}>Edit</Option>
        </Button>
        <Button>
          <Option icon={<Export_Icon />}>Export</Option>
        </Button>
        <DeleteRecordAlert record={record}>
          <Button>
            <Option icon={<Trash_Icon />}>Delete</Option>
          </Button>
        </DeleteRecordAlert>
      </div>
    </div>
  )
}

export function Option({
  children,
  icon,
}: {
  color?: string
  children?: ReactNode
  icon?: ReactNode
}) {
  return (
    <>
      <span className="icon">{icon}</span>
      <span>{children}</span>
    </>
  )
}
