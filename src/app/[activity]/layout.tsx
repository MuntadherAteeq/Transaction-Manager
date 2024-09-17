import L_Sidebar from "../Layouts/L-Sidebar"
import ActivityBar from "../Layouts/ActivityBar"
import TitleBar from "../Layouts/Title-Bar"
import Record_List from "../Components/Record-List"
import { redirect } from "next/navigation"
import { getUser } from "../Library/lucia"
import { Activities } from "../Utils/common"
import Dashboard from "../Layouts/Dashboard"

export default async function RecordList({
  children,
  params,
}: {
  children: React.ReactNode
  params: { activity: string }
}) {
  const session = await getUser()
  if (session === null) redirect("/Auth")
  const activity = Activities.includes(params.activity)
    ? params.activity
    : redirect("/Archive")

  const isDashboard = activity === "Dashboard"

  return (
    <>
      <TitleBar />
      <div className="App-Container">
        <ActivityBar />
        {isDashboard ? (
          <>
            <Dashboard />
          </>
        ) : (
          <>
            <L_Sidebar>
              <Record_List activity={activity} />
            </L_Sidebar>
            {children}
          </>
        )}
      </div>
    </>
  )
}
