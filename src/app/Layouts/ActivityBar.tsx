"use client";
import { History_Icon } from "../Assets/Icons/Histoey";
import { Settings_Icon } from "../Assets/Icons/Settings";
// import Wallet_Icon from "../Assets/Icons/Wallet";
import { Box_Icon } from "../Assets/Icons/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Settings_DropdownMenu } from "../Components/DropDownMenu/SetteingsMenu";

interface ActivityBarProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function ActivityBar(props: ActivityBarProps) {
  return (
    <div {...props} className="ActivityBar">
      <div className="top">
        <Activity id="Archive" svg={<Box_Icon />} />
        <Activity id="History" svg={<History_Icon />} />
        {/* <Activity id="Wallet" svg={<Wallet_Icon />} /> */}
        <Activity id="Dashboard" svg={<DashboardIcon />} />
      </div>
      <div className="bottom">
        <Settings_DropdownMenu>
          <Settings_Icon />
        </Settings_DropdownMenu>
      </div>
    </div>
  );
}

interface ActivityProps extends React.HTMLAttributes<HTMLLabelElement> {
  svg: JSX.Element;
  id: string;
  active?: boolean;
  key?: string;
}
const Activity = ({ id, svg, ...props }: ActivityProps) => {
  const path = usePathname();
  return (
    <label htmlFor={id} {...props}>
      <Link href={`/${id}`}>
        <input
          id={id}
          type="radio"
          checked={path?.split("/")[1] === id ? true : false}
          name="Activity"
          readOnly
        />
        {svg}
      </Link>
    </label>
  );
};
