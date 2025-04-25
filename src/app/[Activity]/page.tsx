import { AccountList } from "@/components/Account/Account-List";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { JobCardForm } from "@/components/JobCard/Job-Card-Form";
import { RecordList } from "@/components/Record/Record-List";
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
      return <Dashboard />;
    case "Accounts":
      return <AccountList Activity={Activity} />;
    case "JobCards":
      return <JobCardForm />;
    default:
      return <div>Default</div>;
  }
}
