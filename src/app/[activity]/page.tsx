import { redirect } from "next/navigation"
import Editor from "../Layouts/Editor"
import R_Sidebar from "../Layouts/R-Sidebar"
import { getUser } from "../Library/lucia"

export default async function Editor_Page(props: any) {
  const session = await getUser()
  if (session === null) redirect("/Auth")
  return (
    <>
      {props.children}
      <Editor />
      <R_Sidebar />
    </>
  )
}
