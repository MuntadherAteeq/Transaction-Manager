import { PrismaClient } from "@prisma/client"
import Editor from "../../Layouts/Editor"
import CreateTableButton from "../../Components/CreateTableButton"
import R_Sidebar from "../../Layouts/R-Sidebar"
import Profile from "../../Components/Profile"
import TableList from "../../Layouts/TableList"

export default async function Record_Page(props: any) {
  const prisma = new PrismaClient()

  const record = await prisma.record.findFirst({
    where: { id: Number.parseInt(props.params.id[0]) },
  })
  const tables = await prisma.table.findMany({
    where: { recordId: Number.parseInt(props.params.id[0]) },
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
