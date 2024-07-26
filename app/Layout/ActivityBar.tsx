"use client"
import { History } from "../Assets/Icons/Histoey"
import { Settings } from "../Assets/Icons/Settings"
import Wallet from "../Assets/Icons/Wallet"
import { Folders } from "../Assets/Icons/Folder"

interface ActivityBarProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function ActivityBar(props: ActivityBarProps) {
  return (
    <div {...props} className="ActivityBar">
      <div className="top">
        <Activity id="folder" svg={<Folders />} />
        <Activity id="history" svg={<History />} />
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
  return (
    <label htmlFor={id} {...props}>
      <input id={id} type="radio" checked={active} name="Activity" />
      {svg}
    </label>
  )
}
