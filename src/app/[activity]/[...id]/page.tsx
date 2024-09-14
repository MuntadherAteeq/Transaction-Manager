import { PrismaClient } from "@prisma/client"
import Editor from "../../Layouts/Editor"
import CreateTableButton from "../../Components/CreateTableButton"
import R_Sidebar from "../../Layouts/R-Sidebar"
import Profile from "../../Components/Profile"
import TableList from "../../Layouts/TableList"
import { redirect } from "next/navigation"
import { getUser } from "@/app/Library/lucia"

export default async function Record_Page({
  params,
}: {
  children: React.ReactNode
  params: { id: string[] }
}) {
  const session = await getUser()
  if (session === null) redirect("/Auth")
  const prisma = new PrismaClient()

  const record = await prisma.record.findFirst({
    where: { id: Number.parseInt(params.id[0]) },
  })
  return (
    <>
      <Editor>
        <CreateTableButton recordId={record?.id} />
        <TableList />
      </Editor>
      <R_Sidebar>{record && <Profile record={record} />}</R_Sidebar>
    </>
  )
}
