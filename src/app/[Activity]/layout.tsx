import React from "react";
import { getAccount } from "../Auth/auth.actions";
import { redirect } from "next/navigation";
import App from "../App";

export default async function Activity_Layout(props: any) {
  const account = await getAccount();
  if (!account) redirect("/Auth");
  return <App account={account}>{props.children}</App>;
}
