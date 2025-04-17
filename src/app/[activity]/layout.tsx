import App from "@/layouts/App";
import { auth, getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

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
