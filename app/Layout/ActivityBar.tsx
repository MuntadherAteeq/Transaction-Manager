"use client"
import { History } from "../Assets/Icons/Histoey"
import { Settings } from "../Assets/Icons/Settings"
import Wallet from "../Assets/Icons/Wallet"
import { Box } from "../Assets/Icons/Folder"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ActivityBarProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function ActivityBar(props: ActivityBarProps) {
  return (
    <div {...props} className="ActivityBar">
      <div className="top">
        <Activity id="Archive" svg={<Box />} />
        <Activity id="History" svg={<History />} />
        <Activity id="Wallet" svg={<Wallet />} />
      </div>
      <div className="bottom">
        <Settings />
      </div>
    </div>
  )
}

interface ActivityProps extends React.HTMLAttributes<HTMLLabelElement> {
  svg: JSX.Element
  id: string
  active?: boolean
  key?: string
}
const Activity = ({ id, svg, active, ...props }: ActivityProps) => {
  const path = usePathname()
  return (
    <label htmlFor={id} {...props}>
      <Link href={`/${id}`}>
        <input
          id={id}
          type="radio"
          checked={path.split("/")[1] === id ? true : false}
          name="Activity"
        />
        {svg}
      </Link>
    </label>
  )
}
