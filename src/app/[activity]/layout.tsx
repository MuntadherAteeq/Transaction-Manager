import App from "@/layouts/App";
import { RecordList } from "@/layouts/Record/Record-List";
import React from "react";

export default async function Activity_Page(props: {
  params: {
    Activity: string;
  };
  children: React.ReactNode;
}) {
  const { Activity } = await props.params;
  return <App>{props.children}</App>;
}
