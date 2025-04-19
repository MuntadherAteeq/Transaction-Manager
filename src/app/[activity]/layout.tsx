import App from "@/layouts/App";

import React from "react";
import { getSession } from "../Auth/auth.actions";
import Auth from "../Auth/page";

export default async function Activity_Page(props: {
  params: {
    Activity: string;
  };
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    return <Auth />;
  } else return <App>{props.children}</App>;
}
