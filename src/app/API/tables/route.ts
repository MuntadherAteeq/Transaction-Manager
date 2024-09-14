import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

export const GET = Handle(async (req: NextRequest) => {
  if (req.method !== "GET") return ErrorResponse("Method Not Allowed", 405)

  const recordId = req.nextUrl.searchParams.get("recordId")

  if (recordId === null) return ErrorResponse("Invalid Record ID", 400)

  const records = await prisma.table.findMany({
    where: { recordId: Number(recordId) },
  })
  return JsonResponse(records, 200)
})
