import { redirect } from "next/navigation";
import { getAccount } from "./Auth/auth.actions";
import App from "./App";

export default async function Page(props: any) {
  const account = await getAccount();
  if (!account) redirect("/Auth");

  return <App account={account}>{props.children}</App>;
}
