import {
  BoxesIcon,
  Clock,
  FolderOpen,
  LayoutDashboard,
  LucideUsers,
} from "lucide-react";

export const Activities = [
  {
    title: "Archive",
    url: "/Archive",
    // icon: <i className="w-full h-full !size-7 icon-[stash--folder-alt]"/>,
    icon: <FolderOpen />,
  },
  {
    title: "History",
    url: "/History",
    // icon: <i className="w-full h-full !size-7 icon-[bi--clock]" />,
    icon: <Clock />,
  },
  {
    title: "Inventory",
    url: "/Inventory",
    // icon: <i className="w-full h-full !size-7 icon-[solar--box-outline]" />,
    icon: <BoxesIcon />,
  },
  {
    title: "Dashboard",
    url: "/Dashboard",
    // icon: <i className="w-full h-full !size-7 icon-[solar--chart-square-linear]" />,
    icon: <LayoutDashboard />,
  },
  {
    title: "Accounts",
    url: "/Accounts",
    // icon: <i className="w-full h-full !size-7 "icon-[hugeicons--user-account]" />,
    icon: <LucideUsers />,
  },
];
