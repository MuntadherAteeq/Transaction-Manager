import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

import { Activities } from "../../Utils/common"

export const POST = Handle(async (req: NextRequest) => {
  if (req.method !== "POST") return ErrorResponse("Method Not Allowed", 405)

  const data = await req.json()
  const { activity } = data

  if (activity === null || !Activities.includes(activity))
    return ErrorResponse("Invalid Activity", 400)

  await prisma.record.create({
    data: { category: activity },
  })

  return JsonResponse("Record Created", 201)
})
