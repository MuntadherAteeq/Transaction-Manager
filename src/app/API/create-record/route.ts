import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

import { Activities } from "../../Utils/common"
import { getUser } from "@/app/Library/lucia"

export const POST = Handle(async (req: NextRequest) => {
  if (req.method !== "POST") return ErrorResponse("Method Not Allowed", 405)

  const data = await req.json()
  const { activity } = data
  const user = await getUser()

  if (activity === null || !Activities.includes(activity))
    return ErrorResponse("Invalid Activity", 400)

  const record = await prisma.record.create({
    data: {
      category: activity,
      userId: user?.id,
    },
  })
  await prisma.table.create({
    data: {
      recordId: record.id,
    },
  })
  return JsonResponse(record, 200)
})
