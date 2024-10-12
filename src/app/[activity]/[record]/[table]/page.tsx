import Invoice from "@/app/Components/Table/Invoice"
import { getUser } from "@/app/Library/lucia"
import { redirect } from "next/navigation"

export default async function Print({
  params,
}: {
  params: { activity: string; record: string; table: string }
}) {
  const user = await getUser()

  if (user === null) redirect("/Auth")

  console.log(params)

  const table = await prisma.table.findFirst({
    where: { id: Number(params.table) },
  })
  const record = await prisma.record.findFirst({
    where: { id: Number(params.record) },
  })

  if (!table || !record) {
    if (!record) redirect(`/${params.activity}`)
    else redirect(`/${params.activity}/${record.id}`)
  }

  return (
    <>
      <Invoice table={table} record={record} user={user} />
    </>
  )
}
