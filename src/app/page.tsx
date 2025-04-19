import { redirect } from "next/navigation";
import { requireAuth } from "./Auth/auth.actions";

export default async function Home(props: any) {
  await requireAuth();
  redirect("/App");
}
