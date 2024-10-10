import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"

import { ErrorResponse, JsonResponse } from "../../Utils/response"

export const POST = Handle(async (req: NextRequest) => {
  if (req.method !== "POST") {
    return ErrorResponse("Method Not Allowed", 405)
  }

  const { recordId, activity } = await req.json()
  console.log(activity)
  const record = await prisma.record.findFirst({
    where: {
      id: recordId,
    },
  })
  record?.category ===  "Wallet" ? "tracker" : ""
  await prisma.table.create({ data: { recordId: recordId , type : "tracker" } })

  return JsonResponse("Record Created", 201)
})
