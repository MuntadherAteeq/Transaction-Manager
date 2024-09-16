import { NextRequest } from "next/server"
import { Handle } from "../errorHandler"
import { ErrorResponse, JsonResponse } from "../../Utils/response"

import { Activities } from "../../Utils/common"
import { getUser } from "@/app/Library/lucia"

export const GET = Handle(async (req: NextRequest) => {
  if (req.method !== "GET") {
    return ErrorResponse("Method Not Allowed", 405)
  }

  const Activity = req.nextUrl.searchParams.get("activity")
  const user = await getUser()

  if (Activity !== null && Activities.includes(Activity)) {
    const records = await prisma.record.findMany({
      where: { userId: user?.id, category: Activity },
      orderBy: { id: "desc" },
    })
    return JsonResponse(records, 200)
  }
  return ErrorResponse("Invalid Activity", 400)
})
