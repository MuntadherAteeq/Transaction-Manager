import L_Sidebar from "../Layouts/L-Sidebar"
import ActivityBar from "../Layouts/ActivityBar"
import TitleBar from "../Layouts/Title-Bar"
import Record_List from "../Components/Record-List"
import { redirect } from "next/navigation"
import { getUser } from "../Library/lucia"
import { Activities } from "../Utils/common"
import Dashboard from "../Layouts/Dashboard"
import { Record_DropdownMenu } from "../Components/DropDownMenu/RecordMenu"

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
              <Record_DropdownMenu>
                <Record_List activity={activity} />
              </Record_DropdownMenu>
            </L_Sidebar>
            {children}
          </>
        )}
      </div>
    </>
  )
}
