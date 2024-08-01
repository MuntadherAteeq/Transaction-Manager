import { PrismaClient } from "@prisma/client"
import Record_List_item from "../Components/Record-List-Item"

async function getRecords() {
  const prisma = new PrismaClient()
  const deals = await prisma.record.findMany()
  return deals
}

export default async function Page(props: any) {
  return (
    <div>
      {await getRecords().then((records) => {
        return records.map((record) => {
          return <Record_List_item key={record.id} />
        })
      })}
    </div>
  )
}
