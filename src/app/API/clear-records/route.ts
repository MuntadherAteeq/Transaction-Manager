import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

export const POST = Handle(async (req: NextRequest) => {
  if (req.method !== "POST") return ErrorResponse("Invalid request method", 405)

  // Clear all tables
  await prisma.table.deleteMany({})
  await prisma.record.deleteMany({})

  return JsonResponse({}, 200)
})
