import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

import { Activities } from "../../Utils/common"
// return all archive records

export const GET = Handle(async (req: NextRequest) => {
  if (req.method !== "GET") {
    return ErrorResponse("Method Not Allowed", 405)
  }

  const Activity = req.nextUrl.searchParams.get("activity")

  if (Activity !== null && Activities.includes(Activity)) {
    const records = await prisma.record.findMany({
      where: { category: Activity },
    })
    return JsonResponse(records, 200)
  }
  return ErrorResponse("Invalid Activity", 400)
})
