import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

export const GET = Handle(async (req: NextRequest) => {
  if (req.method !== "GET") return ErrorResponse("Method Not Allowed", 405)
  const recordId = req.nextUrl.searchParams.get("recordId")
  const activity = req.nextUrl.searchParams.get("activity")

  if (recordId === null) return ErrorResponse("Invalid Record ID", 400)
  if (activity === null) return ErrorResponse("Invalid Activity", 400)

  if (activity === "History") {
    const records = await prisma.table.findMany({
      where: { recordId: Number(recordId), isCompleted: true },
      orderBy: { id: "desc" },
    })
    return JsonResponse(records, 200)
  }
  if (activity === "Archive") {
    const records = await prisma.table.findMany({
      where: { recordId: Number(recordId), isCompleted: false },
      orderBy: { id: "desc" },
    })
    return JsonResponse(records, 200)
  }

  const records = await prisma.table.findMany({
    where: { recordId: Number(recordId) },
    orderBy: { id: "desc" },
  })
  return JsonResponse(records, 200)
})
