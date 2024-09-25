"use client"
import type { Record } from "@prisma/client"
import { Record_Property } from "../Record/Record-Property"
import Phone_Icon from "../../Assets/Icons/Phone"
import Calender_Icon from "../../Assets/Icons/Calender"
import Email_Icon from "../../Assets/Icons/Email"
import Info_Icon from "../../Assets/Icons/info"
import { MouseEventHandler, ReactNode, useMemo, useState } from "react"
import { Trash_Icon } from "../../Assets/Icons/Trash"
import Done_Icon from "../../Assets/Icons/Done"
import { Settings_Icon } from "../../Assets/Icons/Settings"
import Export_Icon from "../../Assets/Icons/Export"
import Avatar from "../Avatar"
import { HomeIcon } from "@radix-ui/react-icons"
import { DeleteRecordAlert } from "../Record/DeleteRecordAlert"
import { Button } from "@/components/ui/button"
import { AlignJustify, Check, DollarSign, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Profile({ record }: { record: Record }) {
  const [name, setName] = useState(record.name)
  const [editable, setEditable] = useState(false)
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
    category: <AlignJustify />,
    balance: <DollarSign />,
  }

  const GetIcon = (type: string): ReactNode => {
    return iconMap[type] || <></>
  }

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setEditable(!editable)
  }

  const recordEntries = useMemo(() => {
    return Object.entries(record).filter(([key]) => keys.includes(key))
  }, [keys, record])

  const { toast } = useToast()

  return (
    <div className="Profile">
      <div className="top">
        <div className="header">
          <Avatar />
          <input
            id="Name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name?.toString()}
            readOnly={!editable}
          />
        </div>
        <form action="POST">
          {recordEntries.map(([key, value]) => (
            <Record_Property
              icon={GetIcon(key)}
              key={key}
              title={key}
              type="text"
              value={value}
              readOnly={!editable}
            />
          ))}
        </form>
      </div>
      <div id="options">
        {editable ? (
          <>
            <span></span>
            <span></span>
            <Button type="submit" onClick={() => setEditable(!editable)}>
              <Option icon={<Check />}>Done</Option>
            </Button>
            <Button onClick={() => setEditable(!editable)}>
              <Option icon={<X />}>Cancel</Option>
            </Button>
          </>
        ) : (
          <>
            <Button>
              <Option icon={<Done_Icon />}>Finish</Option>
            </Button>
            <Button onClick={handleEdit}>
              <Option icon={<Settings_Icon />}>Edit</Option>
            </Button>
            <Button
              onClick={() => {
                toast({
                  variant: "destructive",
                  title: "Coming Soon",
                  description:
                    "This feature is under development and will be available soon.",
                })
              }}
            >
              <Option icon={<Export_Icon />}>Export</Option>
            </Button>
            <DeleteRecordAlert record={record}>
              <Button>
                <Option icon={<Trash_Icon />}>Delete</Option>
              </Button>
            </DeleteRecordAlert>
          </>
        )}
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
