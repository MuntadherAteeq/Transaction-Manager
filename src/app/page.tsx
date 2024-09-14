import { getUser } from "./Library/lucia"
import { redirect } from "next/navigation"
import L_Sidebar from "./Layouts/L-Sidebar"
import Editor from "./Layouts/Editor"
import R_Sidebar from "./Layouts/R-Sidebar"
import ActivityBar from "./Layouts/ActivityBar"
import TitleBar from "./Layouts/Title-Bar"

export default async function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getUser()
  if (session === null) redirect("/Auth")
  return (
    <>
      <TitleBar />
      <div className="App-Container">
        <ActivityBar />
        <L_Sidebar />
        <Editor />
        <R_Sidebar />
        {children}
      </div>
    </>
  )
}
