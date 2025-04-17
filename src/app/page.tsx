import { auth, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home(props: any) {
  const session = await getSession();
  if (!session) redirect("/Auth");
  redirect("/Archive");
}
