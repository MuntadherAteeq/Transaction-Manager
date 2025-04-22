import { redirect } from "next/navigation";
import { getUser } from "./Auth/auth.actions";
import App from "./App";

export default async function Page(props: any) {
  const user = await getUser();
  if (!user) redirect("/Auth");

  return <App user={user}>{props.children}</App>;
}
