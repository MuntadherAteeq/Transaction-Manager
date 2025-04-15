import { RecordItems, RecordList } from "@/layouts/Record/RecordList";
import React from "react";

export default function Activity_Page(props: any) {
  const { Activity } = React.use<any>(props.params);

  switch (Activity) {
    case "Archive":
      return (
        <RecordList activity={Activity}>
          <RecordItems activity={Activity} />
        </RecordList>
      );
    case "Inventory":
      return <div>Inventory</div>;
    case "History":
      return (
        <RecordList activity={Activity}>
          <RecordItems activity={Activity} />
        </RecordList>
      );
    case "Dashboard":
      return <div>Dashboard</div>;
    case "Settings":
      return <div>Settings</div>;
    default:
      return <div>404</div>;
  }
}
