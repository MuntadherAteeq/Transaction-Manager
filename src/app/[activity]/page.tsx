import { RecordItems, RecordList } from "@/layouts/Record/RecordList";
import React from "react";

export default function Activity_Page(props: any) {
  const params = React.use<any>(props.params);

  if (!params) {
    return <div>Loading...</div>;
  }

  switch (params.Activity) {
    case "Archive":
      return <RecordItems activity="Archive" />;
    case "Inventory":
      return <div>Inventory</div>;
    case "History":
      return <RecordItems activity="History" />;
    case "Dashboard":
      return <div>Dashboard</div>;
    case "Settings":
      return <div>Settings</div>;
    default:
      return <div>404</div>;
  }
}
