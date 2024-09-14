import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"

import { ErrorResponse, JsonResponse } from "../../Utils/response"

export const POST = Handle(async (req: NextRequest) => {
  if (req.method !== "POST") {
    return ErrorResponse("Method Not Allowed", 405)
  }

  const data = await req.json()
  await prisma.table.create({ data: { recordId: data.recordId } })

  return JsonResponse("Record Created", 201)
})
