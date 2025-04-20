import { AccountList } from "@/components/Account/Account-List";
import { RecordList } from "@/components/Record/Record-List";
import { redirect } from "next/navigation";
import React from "react";

export default async function Activity_Page(props: any) {
  const { Activity } = await props.params;

  switch (Activity) {
    case "Archive":
      return <RecordList Activity={Activity} />;
    case "Inventory":
      return <div>Inventory</div>;
    case "History":
      return <RecordList Activity={Activity} />;
    case "Dashboard":
      return <div>Dashboard</div>;
    case "Accounts":
      return <AccountList Activity={Activity} />;
    default:
      redirect("/Archive");
  }
}
