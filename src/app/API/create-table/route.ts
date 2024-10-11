import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"

import { ErrorResponse, JsonResponse } from "../../Utils/response"

export const POST = Handle(async (req: NextRequest) => {
  if (req.method !== "POST") {
    return ErrorResponse("Method Not Allowed", 405)
  }

  const { recordId, activity } = await req.json()
  console.log(activity)
  await prisma.record.findFirst({
    where: {
      id: recordId,
    },
  })

  await prisma.table.create({ data: { recordId: recordId } })

  return JsonResponse("Record Created", 201)
})
