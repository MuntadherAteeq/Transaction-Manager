import React from "react";
import { getSession } from "../Auth/auth.actions";
import { redirect } from "next/navigation";
import App from "../App";
import { SplashScreen } from "@/components/Splash-Screen";

export default async function Activity_Layout(props: {
  params: { Activity: string };
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/Auth");
  return <App>{props.children}</App>;
}
