import { RecordList } from "@/layouts/Record/Record-List";
import React from "react";

export default function Activity_Page(props: any) {
  const { Activity } = React.use<any>(props.params);

  switch (Activity) {
    case "Archive":
      return <RecordList activity={Activity} />;
    case "Inventory":
      return <div>Inventory</div>;
    case "History":
      return <RecordList activity={Activity} />;
    case "Dashboard":
      return <div>Dashboard</div>;
    case "Settings":
      return <div>Settings</div>;
    default:
      return <div>404</div>;
  }
}
