import { getUser } from "./Library/lucia"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getUser()
  if (session === null) redirect("/Auth")
  redirect("/Archive")
}
