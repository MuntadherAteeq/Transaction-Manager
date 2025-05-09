// Make Activities for each role of the user
// import { Account } from "@prisma/client";

import { Account } from "@prisma/client";

export const Activities = (role: string | undefined | null) => {
  switch (role) {
    case "Admin":
      return [
        {
          title: "Dashboard",
          url: "/App/Dashboard",
          icon: "icon-[solar--chart-square-linear]",
        },
        {
          title: "Accounts",
          url: "/App/Accounts",
          icon: "icon-[hugeicons--user-account]",
        },
        {
          title: "Vehicles",
          url: "/App/Vehicles",
          icon: "icon-[hugeicons--car-01]",
        },
        // {
        //   title: "Archive",
        //   url: "/App/Archive",
        //   icon: "icon-[stash--folder-alt]",
        // },
        // {
        //   title: "History",
        //   url: "/App/History",
        //   icon: "icon-[bi--clock]",
        // },
        // {
        //   title: "Inventory",
        //   url: "/App/Inventory",
        //   icon: "icon-[solar--box-outline]",
        // },
        {
          title: "Job Cards",
          url: "/App/JobCards",
          icon: "icon-[fluent--card-ui-24-regular]",
        },
        {
          title: "Settings",
          url: "/App/Settings",
          icon: "icon-[solar--settings-linear]",
        },
      ];
    case "User":
      return [
        {
          title: "Job Cards",
          url: "/App/JobCards",
          icon: "icon-[fluent--card-ui-24-regular]",
        },
      ];
    default:
      return [];
  }
};
