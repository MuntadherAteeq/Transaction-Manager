import App from "@/layouts/App";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Activity_Page(props: {
  params: {
    Activity: string;
  };
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("Session", session);
  if (!session) redirect("/Auth");

  return <App>{props.children}</App>;
}
