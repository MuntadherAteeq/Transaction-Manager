import App from "@/layouts/App";
import { auth, getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home(props: any) {
  const session = await getSession();
  if (!session) redirect("/Auth");
  return <App>{props.children}</App>;
}
