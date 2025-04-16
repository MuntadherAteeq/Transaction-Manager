import App from "@/layouts/App";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home(props: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("Session:", session);
  !session ? redirect("/Auth") : null;
  return <App>{props.children}</App>;
}
