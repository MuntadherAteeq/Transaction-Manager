import App from "@/layouts/App";

import React from "react";
import { getSession } from "../Auth/auth.actions";
import { redirect } from "next/navigation";

export default async function Activity_Page(props: {
  params: {
    Activity: string;
  };
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/Auth");
  return <App>{props.children}</App>;
}
