"use client";

import App from "@/layouts/App";
import Background from "@/layouts/Background";
import { authClient } from "@/lib/auth-client";

export default function Home(props: any) {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  console.log("Session data:", session);
  console.log("Session error:", error);
  console.log("Session isPending:", isPending);
  return <App>{props.children}</App>;
}
